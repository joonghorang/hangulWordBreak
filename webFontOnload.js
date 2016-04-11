/*
Coded in NHN NEXT 2015.

- HOW TO USE
function callBack(){
// type logic what after webfont loaded.
}

webFontOnloadCheck("webFontName", callBack);

-Send Bug Report
	zhenos@hotmail.com

*/
function webFontOnloadCheck(textPageFontName, callBack){
  var deferred = $.Deferred();
  function webFontOnload(textPageFontName){
    var promise = deferred.promise();
    var TEST_HTML= "<span class = 'test' id = 'testText'>This is for check webFont Load.</span>";
    $(TEST_HTML).css("opacity" , "0").appendTo("body"); // 비교할 더미 span태그를 삽입
    var $testText =  $('#testText');
    var beforeTestWidth = $testText.width();
    var timeCheck = setInterval(function(){
      checkTestTextWidth(textPageFontName, $testText, beforeTestWidth, timeCheck);
    }, 100);
    return promise;
  }

  function checkTestTextWidth(textPageFontName, $testText, beforeTestWidth, timeCheck){
    $testText.css("fontFamily", textPageFontName);
    if($testText.width() === beforeTestWidth){
      $('#testText').remove();
      console.log(1);
    } else {
      $('#testText').remove();
      clearInterval(timeCheck);
      deferred.resolve();
    }
  }

  webFontOnload().
    done(function(){
      console.log("success");
      $('#testText').remove();
      callBack();
    }); // fail구문은 setInterval로 다시 돌아가기 때문에 현 로직상 불필요.
}
