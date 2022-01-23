const initHoverContainer = () => {
  const hoverHTML = `
<div id="selected-text-box"></div>
<div id="selected-text-save-box">
  <div id="title">이 단어를 저장해보세요!</div>
  <div id="folders">
    <span class="placeholder" id="folders-text">저장할 폴더를 선택해주세요.</span>
    <span id="folders-icon">
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7 7L13 1" stroke="#C5C8CD" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </div>
  <div id="memo-container">
    <textarea placeholder="이 단어에 대한 메모를 적어주세요." id="memo" rows="5" cols="33"></textarea>
    <span id="memo-length">0 / 140자</span>
  </div>
  <button id="cancel-btn">취소</button>
  <button id="store-btn">저장</button>
  <button id="config-btn">설정</button>
  <button id="voca-btn">단어장 전체보기</button>
</div>
`
  const hoverContainer = document.createElement('div');
  hoverContainer.setAttribute("id", "hover-container")
  hoverContainer.innerHTML = hoverHTML;
  document.body.appendChild(hoverContainer);
  hoverContainer.style.display = "none";
}

const hide = (element) => {
  element.style.display = "none";
}

const show = (element) => {
  element.style.display = "block";
}

const getHoverContainer = () => {
  return document.getElementById("hover-container");
}

const getSelectedTextBox = () => {
  return document.getElementById("selected-text-box");
}

const showSelectedTextOnHover = (selectedText) => {
  const selectedTextBox = getSelectedTextBox();
  selectedTextBox.innerHTML = selectedText
}

const hideSelectedTextOnHover = () => {
  const selectedTextBox = getSelectedTextBox();
  selectedTextBox.innerHTML = "";
}

const showAndHideHoverEvent = () => {
  document.addEventListener('mouseup', (e) => {
    const selectedText = window.getSelection().toString();
    const hoverContainer = getHoverContainer();
    
    if (selectedText.length > 0) {
      show(hoverContainer);
      showSelectedTextOnHover(selectedText);
    } else if (selectedText.length === 0) {
      hide(hoverContainer);
      hideSelectedTextOnHover(selectedText);
    }
  })
  
  getHoverContainer().addEventListener('mouseup', (e) => {
    e.stopPropagation();
  })
}



const initHeadTag = () => {
  const link1 = document.createElement('link');
  link1.href = '//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
  link1.srel = 'stylesheet'
  link1.type = 'text/css'
  document.head.appendChild(link1);

  const link2 = document.createElement('link');
  link2.href = '//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-jp.css'
  link2.srel = 'stylesheet'
  link2.type = 'text/css'
  document.head.appendChild(link2);

  const link3 = document.createElement('link');
  link3.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
  link3.integrity = 'sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==';
  link3.crossorigin = 'anonymous'
  link3.referrerpolicy = 'no-referrer'
  document.head.appendChild(link3);

  const link4 = document.createElement('link');
  link4.rel = 'stylesheet';
  link4.href = 'https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css';
  document.head.appendChild(link4);

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js';
  document.head.appendChild(script);
}


const textareaKeyUpEvent = () => {
  const textarea = document.getElementById('memo');
  textarea.addEventListener('keyup', (e) => {
    textarea.style.height = "1px";
    textarea.style.height = (8 + textarea.scrollHeight) + "px";

    const memoLength = document.getElementById('memo-length');
    memoLength.innerHTML = textarea.value.length + ' / 140자'
  });
}


initHoverContainer();
initHeadTag();
showAndHideHoverEvent();
textareaKeyUpEvent();