import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import { firestorePlugin } from 'vuefire'
import moment from 'moment'

import VCalendar from 'v-calendar';

import 'ant-design-vue/dist/antd.less'
import 'v-calendar/lib/v-calendar.min.css';
import '@/styles/main.scss';
import '@/styles/external/line-awesome.css';

Vue.use(Antd);
Vue.use(firestorePlugin);

Vue.use(VCalendar, {
  firstDayOfWeek: 2,
  formats: {
    title: 'MMMM YYYY',
    weekdays: 'WWW',
    navMonths: 'MMM',
    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    dayPopover: 'L',
  }
});

Vue.prototype.moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
