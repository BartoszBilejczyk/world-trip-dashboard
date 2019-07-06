import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { db } from '@/db';

const store = new Vuex.Store({
  state: {
    activeCountryId: '',
    countries: []
  },
  mutations: {
    setActiveCountry(state, payload) {
      state.activeCountryId = payload;
    },
    setCountries(state, payload) {
      state.countries = payload;
    },
    addCountry(state, payload) {
      state.countries = [...state.countries, payload];
    },
    updateCountry(state, payload) {
      const index = state.countries.findIndex(el => el.id === payload.id);
      state.countries = [
        ...state.countries.slice(0, index),
        payload,
        ...state.countries.slice(index + 1)
      ];
    },
    removeCountry(state, payload) {
      state.countries = state.countries.filter(c => c.id !== payload);
    },
  },
  getters: {
    getOneCountry(state) {
      return state.activeCountryId ? state.countries.find((c) => c.id === state.activeCountryId) : {}
    }
  },
  actions: {
    async fetchCountries({commit}) {
      let countries = [];

      await db.collection('countries').orderBy('name').get().then(querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          countries.push({...doc.data(), id: doc.id});
        });
      });

      commit('setCountries', countries)
    },
    async addCountry({commit}, payload) {
      await db.collection('countries').add(payload).then((doc) => {
        commit('addCountry', {...payload, id: doc.id});
      });
    },
    async updateCountry({commit}, payload) {
      await db.collection('countries').doc(this.$store.state.activeCountryId).update(payload).then((doc) => {
        commit('updateCountry', {...payload, id: doc.id});
      })
    },
    async removeCountry({commit, state}, payload) {
      await db.collection('countries').doc(payload).delete();

      commit('removeCountry', payload);
    },
  }
});

export default store;
