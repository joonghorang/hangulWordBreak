/*
Coded in NHN NEXT 2015.

- HOW TO USE
	var wordBreak = new wordBreak('Your Web Font Name', 'Your Target <p> Class Name');
	ex)
	var pageTextWordBreak = new wordBreak('NotoSans', '.pageText'); 
	//본문텍스트에 해당하는 css파일과 동일한 이름의 폰트 이름을 인자로 넘겨준다. 
	// 웹폰트 로딩체크 함수에서 비교 폰트로 'arial'을 사용하고 있으니, 만약 같은 이름으로 웹폰트를 지정했다면 웹폰트의 이름을 바꾼다. 만약 'arial'을 실제 페이지 폰트로 적용했더라도, 해당 폰트는 어떤 os에도 설치되어 있는 기본폰트이므로 로딩체크가 무의미해지므로 문제될 것은 없다. 

-Send Bug Report
	zhenos@hotmail.com
	
*/

function wordBreak(textPageFontName, targetClasssName){
	var globalWebFontName = textPageFontName; //윈도우 이므로 전역에 변수추가.
	var check;
	var beforeTestWidth;
	webFontLoadCheckAndAfterWordBreak();

	function webFontLoadCheckAndAfterWordBreak(){
		// 라인별로 비교 후 완성된 문장을 반환
		$("body").append( "<span class = 'test' id = 'test1'>This is for check webFont Load.</span>" ); // 비교할 더미 span태그를 삽입
		//adjust tempP CSS style to element CSS
		$('.test').css("opacity", 0);
		$('.test').css("fontFamily", "arial");
		beforeTestWidth = $('#test1').width();
		check = setInterval(function(){
			checkWidthAndStartBreak(targetClasssName)
		}, 100);
	}
	function checkWidthAndStartBreak(targetClasssName){
		$('.test').css("fontFamily", globalWebFontName);
		if($('#test1').width() !== beforeTestWidth){
			clearInterval(check);
			wordBreakEveryPage(targetClasssName);
			$(".test").remove();	
		} 
	}
	function wordBreakEveryPage(targetClasssName){
	    //대부분 pageText에서 거슬리는 디자인 현상이므로 본문에만 적용하도록 한다. 
	    var pList = $(targetClasssName);
	     for (var i = 0; i < pList.length; i++) {
	        //USE WordBreakHangul.js 
	        //ex) workBreakHangul(element);      
	        wordBreakHangul(pList[i]); 
	    }
	}

	// init
	function wordBreakHangul(element){
		var originText = element.innerText;
		var pageWords = protectWord(originText);
		compareWidth(pageWords);

		// protect word crop the end of the line
		function protectWord(OriginalText){
			var resultText = "";	// 최종 결과를 담을 배열 
			// '\n'을 html코드를 위해 <br>로 바꿔준다. 
			resultText = OriginalText.replace(new RegExp('\n', 'g'), '<br>');
			// 문장들을 단어단위로 쪼개서 배열 형태로 삽입한다. 
			var pageWords = [];
			var index = 0;
			for(var i = 0; i < resultText.length; i++){
				if(resultText[i] === " "){
					pageWords.push(resultText.slice(index, i));
					index = i;
				} else if(resultText[i]+resultText[i+1]+resultText[i+2]+resultText[i+3] === "<br>" && i === index){
					pageWords.push(resultText.slice(index, (index + 4)));
					index = i + 4;
				} else if(resultText[i]+resultText[i+1]+resultText[i+2]+resultText[i+3] === "<br>"){
					pageWords.push(resultText.slice(index, i));
					pageWords.push(resultText.slice(i, i + 4));
					index = i + 4;			
				} else if(i === resultText.length-1){
					pageWords.push(resultText.slice(index, resultText.length));
				}
			}
			// del Empty pageWords
			for(var i = 0; i < pageWords.length; i++){
				if(pageWords[i] === " " || pageWords[i] === ""){
					pageWords.splice(i, 1);
				}
			}
			return pageWords;
		}
		function compareWidth(pageWords){

			// 라인별로 비교 후 완성된 문장을 반환
			$("body").append( "<span id = 'tempP'></span>" ); // 비교할 더미 span태그를 삽입
			//adjust tempP CSS style to element CSS
			var tempP = $('#tempP'); // 해당 엘레멘트를 변수로 저장
			tempP.css('position', 'absolute').css('top', '0').css('left', '0').css('opacity', '0').css('fontFamily', globalWebFontName);
			var tempPfontSize = $(element).css('fontSize');
	        var tempPletterSpacing = $(element).css('letterSpacing');
	        var tempPwordSpacing = $(element).css('wordSpacing');
			tempP.css("fontSize", tempPfontSize).css("letterSpacing", tempPletterSpacing).css("wordSpacing", tempPwordSpacing);
			//init 
			var resultPageText = "";
			var lineContainer = "";
			var lineParallel = "";
			var pageContentTextWidth = $(element).width();
			if(pageWords.length === 1){
				resultPageText = pageWords[0];
			} else {
				for(var i = 0; i < pageWords.length; i++){
					// 더미 span에 값을 집어넣어 최대 가로 길이보다 길면 "\n"을 삽입하여 넘긴다.
					// 각 단어를 순회하면서 더미 span태그에 삽입해보고 해당 태그의 가로길이를 체크하여
					// 기준치보다 길 경우에는 미리 더하기 전의 문장을 결과 배열에 삽입하고, 
					// 그렇지 않다면 매번 더하기 전의 문장을 복사한 후,
					// 단어하나를 더미 span에 삽입한다. 
					// 최대길이 이하일 때
					if(tempP.width() < pageContentTextWidth){ // * 가끔, 폰트사이즈 브라우저 오류로 width()값 체크가 안될 때를 대비하여 버퍼값을 넣어준다. 
						if(pageWords[i] === "<br>"){
							resultPageText += lineContainer + pageWords[i];
							lineContainer = "";
							lineParallel = "";
							tempP.text("");
						} else if(i === pageWords.length-1){ // 아직까지 최대크기를 넘지 않았으나 마지막 단어인 경우,
							lineParallel = lineContainer;
							lineContainer += pageWords[i];
							tempP.text(lineContainer);
							if(tempP.width() <pageContentTextWidth) {//마지막 단어까지 더해도 만약 최대 크기를 넘지 않는다면,
								resultPageText += lineParallel + pageWords[i];
							} else { // 마지막 단어를 더했더니 만약 그 크기를 넘었다면.
								resultPageText += lineParallel + '<br>' + pageWords[i];
							}
						} else{

						// 이미 늘어난 문장이기 전의 상태를 기억하기 위해서 lineParallel을 사용
						lineParallel = lineContainer;
						// 임시 문장에 새로운 단어를 삽입 
						lineContainer += pageWords[i];

						// 잠시 담아두었던 문장을 실제로 더미 span에 삽입한다. 
						tempP.text(lineContainer);
						}
					// 최대길이 이상일 때 
					} else {
						if(i == pageWords.length-1){ 
							resultPageText += lineParallel + "<br>" + pageWords[i-1] + pageWords[i];
						} else {
							resultPageText += lineParallel + "<br>";
						}
						// 다음문장을 위하여 
						//라인 컨테이너에 라인오버했던 단어와 이
						//번 순서에 넣어주어야 했을 단어를 더하여 넣어준다. 
						lineContainer = pageWords[i-1] + pageWords[i];
						tempP.text("");					
					}
				}			
			}
			element.innerHTML = resultPageText;
			$('#tempP').remove();
		}
	}

}
