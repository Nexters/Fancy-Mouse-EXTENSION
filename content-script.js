initHoverContainer();

document.addEventListener('mouseup', function(e) {
  const selectedText = window.getSelection().toString();
  const hoverContainer = getHoverContainer();
  if (selectedText.length > 0) {
    show(hoverContainer);
  } else {
    hide(hoverContainer);
  }
})


const initHoverContainer = () => {
  const hoverHTML = `
<select name="folders" id="folders">
  <option value="toeic">Toeic</option>
  <option value="toss">Toss</option>
  <option value="favorite">Favorite</option>
</select>
<textarea rows="5" cols="33"></textarea>
`
  const hoverContainer = getHoverContainer();
  hoverContainer.setAttribute("id", "hover-container")
  hoverContainer.innerHTML = hoverHTML;
  document.body.appendChild(hoverContainer);
  hoverContainer.style.display = "none";
}

const getHoverContainer = () => {
  return document.getElementById("hover-container");
}

const hide = (element) => {
  element.style.display = "none";
}

const show = (element) => {
  element.style.display = "block";
}