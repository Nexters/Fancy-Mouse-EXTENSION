const onOffBtn = document.getElementById("onOffBtn");

onOffBtn.addEventListener('click', (e) => {
  if (onOffBtn.innerHTML === "ON") {
    onOffBtn.innerHTML = "OFF"
    chrome.action.enable();
  } else if (onOffBtn.innerHTML === "OFF") {
    onOffBtn.innerHTML = "ON"
    console.log("disable 함수 실행");
    chrome.action.disable();
  }
})
