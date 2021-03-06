## 설명 1. 

위 링크의 Getting Started를 먼저 보고 따라해볼 것을 추천한다. 아마 밑의 링크를 보고 따라하게 되면, 전체적으로 어떤 방식으로 작동하는 지 빠르게 감을 잡을 수 있을 것이다. 

https://developer.chrome.com/docs/extensions/mv3/getstarted/

## 설명 2.
크롬 익스텐션은 크게 2가지 구조로 나뉜다. 
1. 크롬 브라우저의 페이지
    - `content-script.js`, `content.css`는 내가 접속하는 페이지에 해당 파일을 주입시키는 형태이다. 즉, 크롬 브라우저의 페이지에 해당 파일들의 코드가 적용된다. 
2. 크롬 익스텐션의 버튼을 눌렀을 때, 작동하게 되는 팝업창
    - `popup.html`, `popup.js`, `background.js`는 크롬 브라우저의 우측 상단에 있는 크롬 익스텐션 아이콘을 눌렀을 때에 팝업창이 뜨는 부분과 관련된 파일이다. 즉, 이 팝업창에 대한 코드를 작성하는 파일이다. 이 팝업창에 대한 코드는 크롬 브라우저의 페이지와는 독립적으로 관리된다. 따라서 `popup.js`, `background.js`는 내가 접속하는 크롬 브라우저의 페이지의 코드에는 영향을 미치지 않는다.

## 설명 3.
### `manifest.json`
- 크롬 익스텐션에 대한 전반적인 설정을 하는 파일

## How to use

1. Clone the repo
2. Fill all the details for Firebase App (Secrets) by replacing `<fill-me>` strings
3. Find these <fill-me> details as explained above
4. Run command `npm install` to install all node-modules / dependencies
5. Run command `npm run build`
6. This will build the `dist` folder
7. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked` extension
   4. Select the `dist` folder

Note: `gitignore` will help ignore the `node_modules` and `dist` folder to be pushed to the github
