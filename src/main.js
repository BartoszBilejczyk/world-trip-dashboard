import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import { firestorePlugin } from 'vuefire'
import moment from 'moment'
import i18n from './i18n'
import * as firebase from 'firebase/app'

import 'vue-simple-calendar/static/css/default.css';

import 'ant-design-vue/dist/antd.less'
import '@/styles/main.scss';
import '@/styles/external/line-awesome.css';

Vue.use(Antd);
Vue.use(firestorePlugin);

Vue.prototype.moment = moment;
Vue.config.productionTip = false;

let app = '';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount('#app');
  }
});
