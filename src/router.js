import Vue from 'vue'
import Router from 'vue-router'
import Country from './views/Country.vue'
import Admin from './views/Admin.vue'
import AdminNew from './views/AdminNew.vue'
import AdminEdit from './views/AdminEdit.vue'
import CountryList from './views/CountryList.vue'
import Calendar from './views/Calendar.vue'
import Budget from './views/Budget.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'continents',
      component: CountryList
    },
    {
      path: '/country',
      name: 'country',
      component: Country
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/budget',
      name: 'budget',
      component: Budget
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/new',
      name: 'admin-new',
      component: AdminNew
    },
    {
      path: '/admin/edit',
      name: 'admin-edit',
      component: AdminEdit
    }
  ]
})
