import store from './store'

import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDHXa1sqekASxWwxg6PJdPEO9XG-PLVLqE",
  authDomain: "hackyeah-summer-2020.firebaseapp.com",
  databaseURL: "https://hackyeah-summer-2020.firebaseio.com",
  projectId: "hackyeah-summer-2020",
  storageBucket: "hackyeah-summer-2020.appspot.com",
  messagingSenderId: "914318546661",
  appId: "1:914318546661:web:54bf6840c45cbcd0b0660c"
};

firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BH4a1vM42jPIKalspV0XN_q8oCr4_T2NATY2c723mHM9x0Odd3_uQBHrroK64iiYNqDixCeQguksl4NLL1X2njg");

messaging.getToken().then((currentToken) => {
  if (currentToken) {
    saveToken(currentToken);
  } else {
    console.log('No Instance ID token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.');
    saveToken(refreshedToken);
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
  });
});

const saveToken = (token) => {
  console.log(token);
  dbRef.child('FCM-TOKENS/' + token).set({
    app: 'web',
    token: token,
  });
};

messaging.onMessage(function(payload) {
  console.log(payload)
  store.dispatch('processNotification', {
    id: Date.now(),
    type: payload.data.type,
    categoryId: payload.data.categoryId,
    country: payload.data.country,
  });
});


const categoriesRef = dbRef.child('CATEGORIES');
categoriesRef.once("value", snapshot => {
  store.commit('setCategories', snapshot.val());
});

const PLRef = dbRef.child('PL');
PLRef.on("value", snapshot => {
  store.commit('setPL', snapshot.val());
});

const CSRef = dbRef.child('CS');
CSRef.on("value", snapshot => {
  store.commit('setCS', snapshot.val());
});

const SKRef = dbRef.child('SK');
SKRef.on("value", snapshot => {
  store.commit('setSK', snapshot.val());
});

const HURef = dbRef.child('HU');
HURef.on("value", snapshot => {
  store.commit('setHU', snapshot.val());
});

const PLDataRef = dbRef.child('PL-data');
PLDataRef.once("value", snapshot => {
  store.commit('setPLData', snapshot.val());
});

const CSDataRef = dbRef.child('CS-data');
CSDataRef.once("value", snapshot => {
  store.commit('setCSData', snapshot.val());
});

const SKDataRef = dbRef.child('SK-data');
SKDataRef.once("value", snapshot => {
  store.commit('setSKData', snapshot.val());
});

const HUDataRef = dbRef.child('HU-data');
HUDataRef.once("value", snapshot => {
  store.commit('setHUData', snapshot.val());
});
