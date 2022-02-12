window.onload = function () {
  chrome.identity.getAuthToken({}, function(token) {
    console.log(token);
    fetch(`https://www.googleapis.com/oauth2/v3/userInfo?access_token=${token}`).then(r => r.json()).then(r => console.log(r));
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

})

let userSignedIn = false;
const clientId = encodeURIComponent('');
const responseType = encodeURIComponent('');
const redirectUri = encodeURIComponent('');
const state = encodeURIComponent('');
const scope = encodeURIComponent('openId');

function createOauth2Url() {
  let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

  let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=${responseType}&redirect_url=${redirectUri}&state=${state}&scope=${scope}`;
  console.log(url);
  return url
}

function isUserSignedIn() {
  return userSignedIn;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.message === 'login') {
    if(isUserSignedIn()) {
      console.log('user already signed in');
    } else {
      chrome.identity.launchWebAuthFlow({
        url: createOauth2Url(),
        interactive: true
      }, function (redirectUrl) {
        console.log(redirectUrl)
      })
    }
  }
})
