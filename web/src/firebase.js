import store from './store'

import * as firebase from "firebase/app";
import "firebase/database";

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

const categoriesRef = dbRef.child('CATEGORIES');
categoriesRef.on("value", snapshot => {
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
