importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyApRWVmBpN-CoIU8IauJjpTvzObD4cTb9o",
  authDomain: "cfgdrop-3e45e.firebaseapp.com",
  projectId: "cfgdrop-3e45e",
  messagingSenderId: "1060676126298",
  appId: "1:1060676126298:web:f78434290bffc671ea7a63"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body
  });
});
