import Vue from 'nativescript-vue';
import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView);

import MainPage from './components/MainPage.vue';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

import firebase from 'nativescript-plugin-firebase';

firebase.init({
  apiKey: "AIzaSyDOVEnFxl7AXDjlxzrgDzJbIEmN2I7770I",
  authDomain: "hy-s-2020.firebaseapp.com",
  databaseURL: "https://hy-s-2020.firebaseio.com",
  projectId: "hy-s-2020",
  messagingSenderId: "532228461078",
  appId: "1:532228461078:web:47cf532115308aa260db37"
}).then(
  instance => {
    try {
      firebase.getValue('/PL')
        .then(result => global.PL = result)
        .catch(error => console.log("Error: " + error));
    } catch (e) {
      console.log(e);
    }
  },
);

Vue.prototype.$firebase = firebase;

new Vue({
  template: `
    <Frame>
      <MainPage />
    </Frame>`,

  components: {
    MainPage
  },
}).$start();