importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAO1d2EL3qFxCAIUi-T7j3FfS9sSzcmSmg",
  authDomain: "hy-s-2020.firebaseapp.com",
  databaseURL: "https://hy-s-2020.firebaseio.com",
  projectId: "hy-s-2020",
  storageBucket: "hy-s-2020.appspot.com",
  messagingSenderId: "532228461078",
  appId: "1:532228461078:web:639107890f0a378f60db37"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  if (payload.data.type === 'change-cat') {
    const notificationTitle = 'Change of restrictions';
    const notificationOptions = {
      body: 'Warning! There has been a change in restrictions. Go to the highlighted category to learn more.',
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  }
});

