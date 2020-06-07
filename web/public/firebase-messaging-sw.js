importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDHXa1sqekASxWwxg6PJdPEO9XG-PLVLqE",
  authDomain: "hackyeah-summer-2020.firebaseapp.com",
  databaseURL: "https://hackyeah-summer-2020.firebaseio.com",
  projectId: "hackyeah-summer-2020",
  storageBucket: "hackyeah-summer-2020.appspot.com",
  messagingSenderId: "914318546661",
  appId: "1:914318546661:web:54bf6840c45cbcd0b0660c"
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

