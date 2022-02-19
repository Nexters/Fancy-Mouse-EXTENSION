chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('request');
  console.log(request);
  sendResponse({ result: "any response from background" });
  return true;
});
