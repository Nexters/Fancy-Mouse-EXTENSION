import { initializeApp } from 'firebase/app';

// Find my details from Firebase Console

// config after registering firebase App
const config = {
    apiKey: "AIzaSyD__YGixspMGmgF6NA09UTZp8f8pHqCYvA",
    authDomain: "fancymouse-cb040.firebaseapp.com",
    projectId: "fancymouse-cb040",
    storageBucket: "fancymouse-cb040.appspot.com",
    messagingSenderId: "75197683931",
    appId: "1:75197683931:web:d4bcfad22b4f60a79954fe",
    measurementId: "G-G8614DWJJS"
};

// This creates firebaseApp instance
// version: SDK 9
const firebaseApp = initializeApp(config);

export{
    firebaseApp
}
