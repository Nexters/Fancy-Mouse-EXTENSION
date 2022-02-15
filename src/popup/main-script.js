const hideElement = (element) => {
  element.style.display = "none";
}

const showElement = (element) => {
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
  selectedTextBox.innerHTML = selectedText;
}

const hideSelectedTextOnHover = () => {
  const selectedTextBox = getSelectedTextBox();
  selectedTextBox.innerHTML = "";
}

const showAndHideHover = (event) => {
  const selectedText = window.getSelection().toString();
  const hoverContainer = getHoverContainer();
  const blankPattern = /[\s]/g;
  if (selectedText.length > 0 && !blankPattern.test(selectedText)) {
    showElement(hoverContainer);
    showSelectedTextOnHover(selectedText);

    fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/definition_kr/?entry=${selectedText}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': rapidHost,
        'x-rapidapi-key': rapidKey
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if (res.ipa) {
        document.getElementById('ipa-text').innerHTML = res.ipa;
      }
      if (res.meaning) {
        document.getElementById('selected-text-meaning').innerHTML = res.meaning.korean;
      }
    })

    fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/example/?entry=${selectedText}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': rapidHost,
        'x-rapidapi-key': rapidKey
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if (res.example) {
        document.getElementById('example-text').innerHTML = res.example[0];
      }
    })

    fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/association/?entry=${selectedText}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': rapidHost,
        'x-rapidapi-key': rapidKey
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if (res.assoc_word) {
        document.getElementById('synonym-text').innerHTML = res.assoc_word.join(", ");
      }
    })
  } else if (selectedText.length === 0) {
    hideElement(hoverContainer);
    hideSelectedTextOnHover(selectedText);
  }
}

const showAndHideHoverEvent = () => {
  document.addEventListener('mouseup', showAndHideHover)

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

const cancelBtnClickEvent = () => {
  const cancelBtn = document.getElementById('cancel-btn');
  cancelBtn.addEventListener('click', (e) => {
    const selectedText = window.getSelection().toString();
    const hoverContainer = getHoverContainer();
    const memo = document.getElementById('memo');
    hideElement(hoverContainer);
    hideSelectedTextOnHover(selectedText);
    memo.value = "";
  })
}

const dropdownClickEvent = () => {
  const folders = document.getElementById('folders');
  folders.addEventListener('click', (e) => {
    const dropdownContents = document.getElementById('dropdown-contents');
    if (dropdownContents.style.display === "block") {
      hideElement(dropdownContents);
    } else {
      showElement(dropdownContents);
    }
  });
}

const dropdownContentsClickEvent = () => {
  const dropdownContents = document.getElementById('dropdown-contents');
  dropdownContents.addEventListener('click', (e) => {
    const clickedDropdownContent = e.target.closest('.dropdown-content');
    const dropdownTextContainer = clickedDropdownContent.querySelector('.dropdown-text-container');
    const folders = document.getElementById('folders');
    document.getElementById('folders').replaceChild(dropdownTextContainer.cloneNode(true), folders.childNodes[1]);
    hideElement(dropdownContents);
  })
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request.message === 'OFF') {
      document.removeEventListener('mouseup', showAndHideHover);
    }
    if (request.message === 'ON') {
      document.addEventListener('mouseup', showAndHideHover);
    }
  }
);

initHeadTag();
showAndHideHoverEvent();
textareaKeyUpEvent();
cancelBtnClickEvent();
dropdownClickEvent();
dropdownContentsClickEvent();

import { firebaseApp } from './firebase_config'
import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';
// Auth instance for the current firebaseApp
const auth = getAuth(firebaseApp);

console.log("popup main!")

onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log('logged in!');
    console.log("current")
    console.log(user)
  } else {
    console.log('No user');
  }
});

document.querySelector('#sign_out').addEventListener('click', () => {
  auth.signOut();
  window.location.replace('./popup.html');
});

// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
