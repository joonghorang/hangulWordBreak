/*
Coded in NHN NEXT 2015.

- HOW TO USE
  webFontOnloadCheck = setInterval(function(){
    if(webFontOnload('Helvetica')){
        clearInterval(webFontOnloadCheck);
        //
        do what you want after webfont load.
        //
    }
  }, 100);

-Send Bug Report
	zhenos@hotmail.com

*/

function webFontOnload(textPageFontName){
  var TEST_HTML= "<span class = 'test' id = 'testText'>This is for check webFont Load.</span>";
  $(TEST_HTML).css("opacity" , "0").appendTo("body"); // 비교할 더미 span태그를 삽입
  var $testText =  $('#testText');
  var beforeTestWidth = $testText.width();
  $testText.css("fontFamily", textPageFontName);
  if($testText.width() === beforeTestWidth){
    $testText.remove();
    return false;
  } else {
    $testText.remove();
    return true;
  }
}
