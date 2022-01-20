const initHoverContainer = () => {
  const hoverHTML = `
<div id="selected-text-box"></div>
<select name="folders" id="folders">
  <option value="toeic">Toeic</option>
  <option value="toss">Toss</option>
  <option value="favorite">Favorite</option>
</select>
<textarea rows="5" cols="33"></textarea>
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

const showSelectedTextOnHover = (selectedText) => {
  const selectedTextBox = document.getElementById("selected-text-box");
  selectedTextBox.innerHTML = selectedText
}

const hideSelectedTextOnHover = () => {
  const selectedTextBox = document.getElementById("selected-text-box");
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
