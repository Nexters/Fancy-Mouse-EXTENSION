// 여기에 Rapid API의 키 값 넣어야 함!

let rapidHost = '<rapid-host>';
let rapidKey = '<rapid-key>';

const initHoverContainer = () => {
  const hoverHTML = `
<div id="selcted-text-container">
  <div id="selected-text-box"></div>
  <div id="dictionary-container">
    <div id="selected-text-meaning">
    </div>
    <div id="selected-text-ipa">
      <span id="ipa">발음</span><span id="ipa-text"></span>
    </div>
    <div id="selected-text-example">
      <span id="example">예문</span><span id="example-text"></span>
    </div>
    <div id="selected-text-synonym">
      <span id="synonym">동의어</span><span id="synonym-text"></span>
    </div>
  </div>
</div>
<div id="selected-text-save-box">
  <div id="title">이 단어를 저장해보세요!</div>
  <div class="dropdown">
    <div id="folders">
      <span class="placeholder" id="folders-text">
        저장할 폴더를 선택해주세요.
      </span>
      <span id="folders-icon">
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L13 1" stroke="#C5C8CD" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
    </div>
    <div id="dropdown-contents">
      <div class="dropdown-content">
        <div class="dropdown-text-container">
          <div class="circle"></div><div class="dropdown-text">폴더명 01</div>
        </div>
      </div>
      <div class="dropdown-content">
        <div class="dropdown-text-container">
          <div class="circle"></div><div class="dropdown-text">폴더명은 최대 열글자에요</div>
        </div>
      </div>
      <div class="dropdown-content">
        <div class="dropdown-text-container">
          <div class="circle"></div><div class="dropdown-text">폴더명 03</div>
        </div>
      </div>
    </div>
  </div>
  <div id="memo-container">
    <textarea placeholder="이 단어에 대한 메모를 적어주세요." id="memo" rows="5" cols="33"></textarea>
    <span id="memo-length">0 / 140자</span>
  </div>
  <div id="btn-container">
    <div id="store-btn">저장하기</div>
  </div>
</div>
`;
  const hoverContainer = document.createElement('div');
  hoverContainer.setAttribute('id', 'hover-container');
  hoverContainer.innerHTML = hoverHTML;
  document.body.appendChild(hoverContainer);
  hoverContainer.style.display = 'none';
};


const hideElement = (element) => {
  element.style.display = 'none';
};

const showElement = (element) => {
  element.style.display = 'block';
};

const getHoverContainer = () => {
  return document.getElementById('hover-container');
};

const getSelectedTextBox = () => {
  return document.getElementById('selected-text-box');
};

const showSelectedTextOnHover = (selectedText) => {
  const selectedTextBox = getSelectedTextBox();
  selectedTextBox.innerHTML = selectedText;
};

const hideSelectedTextOnHover = () => {
  const selectedTextBox = getSelectedTextBox();
  selectedTextBox.innerHTML = '';
};

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
      console.log(res);
      if (res.ipa) {
        document.getElementById('ipa-text').innerHTML = res.ipa;
      }
      if (res.meaning) {
        document.getElementById('selected-text-meaning').innerHTML = res.meaning.korean;
      }
    });

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
    });

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
        document.getElementById('synonym-text').innerHTML = res.assoc_word.join(', ');
      }
    });
  } else if (selectedText.length === 0) {
    hideElement(hoverContainer);
    hideSelectedTextOnHover(selectedText);
  }
};

const showAndHideHoverEvent = () => {
  document.addEventListener('mouseup', showAndHideHover);

  getHoverContainer().addEventListener('mouseup', (e) => {
    e.stopPropagation();
  });
};

const initHeadTag = () => {
  const link1 = document.createElement('link');
  link1.href = '//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css';
  link1.srel = 'stylesheet';
  link1.type = 'text/css';
  document.head.appendChild(link1);

  const link2 = document.createElement('link');
  link2.href = '//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-jp.css';
  link2.srel = 'stylesheet';
  link2.type = 'text/css';
  document.head.appendChild(link2);

  const link3 = document.createElement('link');
  link3.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
  link3.integrity = 'sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==';
  link3.crossorigin = 'anonymous';
  link3.referrerpolicy = 'no-referrer';
  document.head.appendChild(link3);
};


const textareaKeyUpEvent = () => {
  const textarea = document.getElementById('memo');
  textarea.addEventListener('keyup', (e) => {
    textarea.style.height = '1px';
    textarea.style.height = (8 + textarea.scrollHeight) + 'px';

    const memoLength = document.getElementById('memo-length');
    memoLength.innerHTML = textarea.value.length + ' / 140자';
  });
};

// const cancelBtnClickEvent = () => {
//   const cancelBtn = document.getElementById('cancel-btn');
//   cancelBtn.addEventListener('click', (e) => {
//     const selectedText = window.getSelection().toString();
//     const hoverContainer = getHoverContainer();
//     const memo = document.getElementById('memo');
//     hideElement(hoverContainer);
//     hideSelectedTextOnHover(selectedText);
//     memo.value = "";
//   })
// }

const dropdownClickEvent = () => {
  const folders = document.getElementById('folders');
  folders.addEventListener('click', (e) => {
    const dropdownContents = document.getElementById('dropdown-contents');
    if (dropdownContents.style.display === 'block') {
      hideElement(dropdownContents);
    } else {
      showElement(dropdownContents);
    }
  });
};

const dropdownContentsClickEvent = () => {
  const dropdownContents = document.getElementById('dropdown-contents');
  dropdownContents.addEventListener('click', (e) => {
    const clickedDropdownContent = e.target.closest('.dropdown-content');
    const dropdownTextContainer = clickedDropdownContent.querySelector('.dropdown-text-container');
    const folders = document.getElementById('folders');
    document.getElementById('folders').replaceChild(dropdownTextContainer.cloneNode(true), folders.childNodes[1]);
    hideElement(dropdownContents);
  });
};

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request);
    if (request.message === 'OFF') {
      document.removeEventListener('mouseup', showAndHideHover);
    }
    if (request.message === 'ON') {
      document.addEventListener('mouseup', showAndHideHover);
    }
  }
);

initHoverContainer();
initHeadTag();
showAndHideHoverEvent();
textareaKeyUpEvent();
// cancelBtnClickEvent();
dropdownClickEvent();
dropdownContentsClickEvent();

import {firebaseApp} from './firebase_config';
import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';
import {initFirebaseApp} from './popup';
// Auth instance for the current firebaseApp
const auth = getAuth(firebaseApp);

console.log('popup main!');

document.getElementById('store-btn').addEventListener('click', () => {
  initFirebaseApp();
});

onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log('logged in!');
    console.log('current');
    console.log(user);
  } else {
    console.log('No user');
  }
});

// document.querySelector('#sign_out').addEventListener('click', () => {
//   auth.signOut();
//   window.location.replace('./popup.html');
// });

// Initialize button with user's preferred color
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', ({color}) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get('color', ({color}) => {
    document.body.style.backgroundColor = color;
  });
}
