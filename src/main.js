import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import { firestorePlugin } from 'vuefire'

import '@/styles/main.scss';
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd);
Vue.use(firestorePlugin);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
