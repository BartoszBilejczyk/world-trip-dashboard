import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Admin from './views/Admin.vue'
import AdminNew from './views/AdminNew.vue'
import AdminEdit from './views/AdminEdit.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
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
