import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'

Vue.use(Vuex);

import { db } from '@/db';

// import from step 3 (below)
import myModule from './modules/myModule.js'

// do the magic 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore(
  [myModule],
  {logging: true, FirebaseDependency: Firebase}
)

const storeData = {
  plugins: [easyFirestore],
  state: {
    country: {name: 'Australia'}
  },
  mutations: {
    // setActiveCountry(state, payload) {
    //   console.log(payload)
    //   state.country = payload;
    // }
  },
  actions: {
    // fetchActiveCountry({commit}, payload) {
    //   console.log(payload)
    //   commit('setActiveCountry', db.collection('countries').where('id', '==', payload))
    // }
  }
}

const store = new Vuex.Store(storeData);

export default store