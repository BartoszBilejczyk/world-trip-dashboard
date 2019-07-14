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

import firebase from '@firebase/app';
import 'firebase/auth';
import { db } from '@/db';

import store from './store'

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
      name: 'country-list',
      component: CountryList,
      meta: { requiresAuth: true }
    },
    {
      path: '/country',
      name: 'country',
      component: Country,
      meta: { requiresAuth: true }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      meta: { requiresAuth: true }
    },
    {
      path: '/budget',
      name: 'budget',
      component: Budget,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/new',
      name: 'admin-new',
      component: AdminNew,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/edit',
      name: 'admin-edit',
      component: AdminEdit,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    // instead of 404, when none of the routes are matched, redirect to home
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
});

const fetchCountries = () => {
  if (!store.state.countries.length) {
    store.dispatch('fetchCountries');
  }
};

router.beforeEach(async (to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  if (!store.state.user.email && currentUser) {
    await db.collection('users').doc(currentUser.uid).get().then(doc => {
      store.commit('setCurrentUser', doc.data());
    });
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if (requiresAdmin && currentUser && !store.state.user.isAdmin) {
    fetchCountries();
    next('/');
  } else if (!requiresAuth && currentUser) {
    next('/');
  } else if (requiresAuth && currentUser) {
    fetchCountries();
    next();
  } else {
    next();
  }
});

export default router;
