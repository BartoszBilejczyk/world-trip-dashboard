import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import { db } from '@/db';


const store = new Vuex.Store({
  state: {
    activeCountryId: ''
  },
  mutations: {
    setActiveCountry(state, payload) {
      state.activeCountryId = payload;
    }
  }
});

export default store
