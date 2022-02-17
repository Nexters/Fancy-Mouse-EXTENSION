import { initializeApp } from 'firebase/app';

// Find my details from Firebase Console

// config after registering firebase App
const config = {
    apiKey: "<apikey>",
    authDomain: "<authDomain>",
    projectId: "<projectId>",
    storageBucket: "<storageBucket>",
    messagingSenderId: "<messagingSenderId>",
    appId: "<appId>",
    measurementId: "<measurementId>"
};

// This creates firebaseApp instance
// version: SDK 9
const firebaseApp = initializeApp(config)

export{
    firebaseApp
}
