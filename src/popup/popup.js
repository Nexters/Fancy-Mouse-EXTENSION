console.log('popup!');

import {firebaseApp} from './firebase_config';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

// Auth instance for the current firebaseApp
const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence);
console.log('auth');
console.log(auth);

function init() {
  // Detect auth state
  onAuthStateChanged(auth, user => {
    console.log('user');
    console.log(user);
    if (user != null) {
      console.log('Below User is logged in:');
      console.log(user);
      // window.location.replace('./main.html');
      console.log('email', user.email);
      console.log('name', user.displayName);
      console.log('uid', user.uid);
    } else {
      console.log('No user logged in!');
    }
  });
}

init();

document.querySelector('.btn__google').addEventListener('click', () => {
  console.log('click google login button');
  initFirebaseApp();
});

document.getElementById('google-login-button').addEventListener('click', () => {
  console.log('click google login');
  initFirebaseApp();
});

export function initFirebaseApp() {
  // Detect auth state
  onAuthStateChanged(auth, user => {
    if (user != null) {
      console.log('logged in!');
      console.log('current');
      console.log(user);
      console.log(user.token);
    } else {
      console.log('No user');
      startSignIn();
    }
  });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
  console.log('started SignIn');
  //https://firebase.google.com/docs/auth/web/manage-users
  const user = auth.currentUser;
  if (user) {
    console.log('current');
    console.log(user);
    auth.signOut();
  } else {
    console.log('proceed');
    startAuth(true);
  }
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  console.log('Auth trying');
  console.log(chrome);
  console.log(chrome.identity);
  chrome.identity.getAuthToken({interactive: true}, function (token) {
    //Token:  This requests an OAuth token from the Chrome Identity API.
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if (chrome.runtime.lastError) {
      console.error(JSON.stringify(chrome.runtime.lastError));
    } else if (token) {
      // Follows: https://firebase.google.com/docs/auth/web/google-signin
      // Authorize Firebase with the OAuth Access Token.
      console.log('TOKEN:');
      console.log(token);
      // Builds Firebase credential with the Google ID token.
      const credential = GoogleAuthProvider.credential(null, token);
      signInWithCredential(auth, credential).then((result) => {
        console.log('Success!!!');
        console.log(result);
      }).catch((error) => {
        // You can handle errors here
        console.log(error);
      });
    } else {
      console.error('The OAuth token was null');
    }
  });
}

function getFolderList (uid) {

}
