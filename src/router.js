import Vue from 'vue'
import Router from 'vue-router'
import Country from './views/Country.vue'
import Admin from './views/Admin.vue'
import AdminNew from './views/AdminNew.vue'
import AdminEdit from './views/AdminEdit.vue'
import CountryList from './views/CountryList.vue'
import Calendar from './views/Calendar.vue'
import Budget from './views/Budget.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

// import firebase from '@firebase/app';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
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
    },
    // instead of 404, when none of the routes are matched, redirect to home
    {
      path: '*',
      redirect: () => '/',
    }
  ]
});

// router.beforeEach(async (to, from, next) => {
//   const avoid = ['login', 'register'];
//
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (avoid.some(name => name === to.name)) {
//       console.log('elo')
//       return next();
//     } else if (user) {
//       console.log('elo')
//       console.log(from.name || from.path)
//       next(from.name || from.path)
//     } else {
//       console.log('elo')
//       next('/login')
//     }
//   });
//
// });

export default router
