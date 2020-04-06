importScripts('https://www.gstatic.com/firebasejs/7.13.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.2/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyBMF-3mB0HR_nKFv7xc-4n4BFM9wAsF8v8",
  authDomain: "communication-19601.firebaseapp.com",
  databaseURL: "https://communication-19601.firebaseio.com",
  projectId: "communication-19601",
  storageBucket: "communication-19601.appspot.com",
  messagingSenderId: "140170659993",
  appId: "1:140170659993:web:8ad6efb5b124e0c66f9008",
  measurementId: "G-PCCWL0NSVH"
});
const messaging = firebase.messaging();