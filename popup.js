const container = document.getElementById("container");

const sendMessage = (message) => {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, message);
  });
}

const setToChromeStorage = (value) => {
  chrome.storage.sync.set({'key': value}, () => {
    console.log('Value is set to ' + value);
  });
}

container.addEventListener('click', (e) => {
  chrome.storage.sync.get(['key'], (result) => {
    if (result.key === 'ON') {
      sendMessage({'message': 'ON'});
      container.innerHTML = '지금은 ON인 상태'
      setToChromeStorage('OFF');
    } else if (result.key === 'OFF') {
      sendMessage({'message': 'OFF'});
      container.innerHTML = '지금은 OFF인 상태';
      setToChromeStorage('ON');
    }
  });
})

chrome.storage.sync.get(['key'], (result) => {
  if (result.key === 'ON') {
    container.innerHTML = '지금은 OFF인 상태';
  } else if (result.key === 'OFF') {
    container.innerHTML = '지금은 ON인 상태';
  }
});