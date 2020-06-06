import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

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
const PLRef = dbRef.child('PL');
PLRef.on("value", snapshot => {
  store.commit('setPL', snapshot.val());
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
