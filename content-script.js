const hoverHTML = `
<div id="hover-container">
  <select name="folders" id="folders">
    <option value="toeic">Toeic</option>
    <option value="toss">Toss</option>
    <option value="favorite">Favorite</option>
  </select>
  <textarea rows="5" cols="33"></textarea>
</div>`
const div = document.createElement('div');
div.innerHTML = hoverHTML;
document.body.appendChild(div);

// 마우스를 눌렀다가 땔 때 발생하는 이벤트
document.addEventListener('mouseup', function(e) {
  const selectedText = window.getSelection().toString();
  if (selectedText > 0) {
    
  }
})


