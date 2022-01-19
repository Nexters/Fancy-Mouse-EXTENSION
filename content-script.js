const hoverHTML = `
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
console.log("시작")
hoverContainer.style.display = "none";


// 마우스를 눌렀다가 땔 때 발생하는 이벤트
document.addEventListener('mouseup', function(e) {
  console.log("mouseup 이벤트")
  const selectedText = window.getSelection().toString();
  const hover = document.getElementById("hover-container");
  if (selectedText.length > 0) {
    hover.style.display = "block";
  } else {
    hover.style.display = "none";
  }
})