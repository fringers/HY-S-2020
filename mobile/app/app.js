import Vue from 'nativescript-vue';
import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView);

import HelloWorld from './components/HelloWorld';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({

    template: `
        <Frame>
            <HelloWorld />
        </Frame>`,

    components: {
        HelloWorld
    }
}).$start();