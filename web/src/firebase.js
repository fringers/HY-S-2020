import store from './store'

import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAO1d2EL3qFxCAIUi-T7j3FfS9sSzcmSmg",
  authDomain: "hy-s-2020.firebaseapp.com",
  databaseURL: "https://hy-s-2020.firebaseio.com",
  projectId: "hy-s-2020",
  storageBucket: "hy-s-2020.appspot.com",
  messagingSenderId: "532228461078",
  appId: "1:532228461078:web:639107890f0a378f60db37"
};

firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BFq3DRJCqS4eVrXXcdoz3LenuCZs2qPm1Oi2RMugux5LhA08urnNIlPdUj5_59LhRxRffWi6FeCkfvyUdTXoZcg");

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
  console.log("Message received. ", payload);
  // ...
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

const PLDataRef = dbRef.child('PL-data');
PLDataRef.on("value", snapshot => {
  store.commit('setPLData', snapshot.val());
});

const CSDataRef = dbRef.child('CS-data');
CSDataRef.on("value", snapshot => {
  store.commit('setCSData', snapshot.val());
});

const SKDataRef = dbRef.child('SK-data');
SKDataRef.on("value", snapshot => {
  store.commit('setSKData', snapshot.val());
});
