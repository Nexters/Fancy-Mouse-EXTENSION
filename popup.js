const onOffBtn = document.getElementById("onOffBtn");

onOffBtn.addEventListener('click', (e) => {
  if (onOffBtn.innerHTML === "ON") {
    onOffBtn.innerHTML = "OFF"
  } else if (onOffBtn.innerHTML === "OFF") {
    onOffBtn.innerHTML = "ON"
  }
})
