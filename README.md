# hangulWordBreak

2바이트 한글문자를 단어가 깨지지 않도록 '띄어쓰기'를 기준으로 해당 p태크 객체 가로 크기에 맞추어서 wordbreak를 만들어줍니다.

![발암줄바꿈](ss.png)
<del>디자이너들의 적 단<br>어 강제 개행을 없<br>애자!</del>

## Installation

```shell
$ bower install hangulWordBreak

```

## Usage

본문텍스트에 해당하는 css파일과 동일한 이름의 폰트 이름을 인자로 넘겨준다. 

웹폰트 로딩체크 함수에서 비교 폰트로 'arial'을 사용하고 있으니, 만약 같은 이름으로 웹폰트를 지정했다면 웹폰트의 이름을 바꾼다. 만약 'arial'을 실제 페이지 폰트로 적용했더라도, 해당 폰트는 어떤 os에도 설치되어 있는 기본폰트이므로 로딩체크가 무의미해지므로 문제될 것은 없다. 

###example

```javascript
var wordBreak = new wordBreak('Your Web Font Name', 'Your Target <p> Class Name');
var pageTextWordBreak = new wordBreak('NotoSans', '.pageText'); 

```

 

## Bug Report
<a href="mailto:zhenos@hotmail.com">zhenos@hotmail.com</a>