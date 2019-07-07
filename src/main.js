import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import { firestorePlugin } from 'vuefire'
import moment from 'moment'

import 'vue-simple-calendar/static/css/default.css';

import 'ant-design-vue/dist/antd.less'
import '@/styles/main.scss';
import '@/styles/external/line-awesome.css';

Vue.use(Antd);
Vue.use(firestorePlugin);

Vue.prototype.moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
