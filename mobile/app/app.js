import Vue from 'nativescript-vue';
import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView);

import MainPage from './components/MainPage.vue';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({

  template: `
    <Frame>
      <MainPage />
    </Frame>`,

  components: {
    MainPage
  }
}).$start();