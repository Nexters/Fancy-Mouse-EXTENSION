const initHoverContainer = () => {
  const hoverHTML = `
<div id="selected-text-box"></div>
<select name="folders" id="folders">
  <option value="toeic">Toeic</option>
  <option value="toss">Toss</option>
  <option value="favorite">Favorite</option>
</select>
<textarea id="memo" rows="5" cols="33"></textarea>
<button id="cancel-btn">취소</button>
<button id="store-btn">저장</button>
<button id="config-btn">설정</button>
<button id="voca-btn">단어장 전체보기</button>
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

initHoverContainer();
showAndHideHoverEvent();