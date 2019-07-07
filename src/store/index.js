import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { db } from '@/db';

const store = new Vuex.Store({
  state: {
    activeCountryId: '',
    countries: [],
    loading: false
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
    setLoading(state, payload) {
      state.loading = payload
    },
  },
  getters: {
    getOneCountry(state) {
      return state.activeCountryId ? state.countries.find((c) => c.id === state.activeCountryId) : {}
    }
  },
  actions: {
    async fetchCountries({commit}) {
      commit('setLoading', true);
      let countries = [];

      await db.collection('countries').orderBy('name').get().then(querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          countries.push({...doc.data(), id: doc.id});
        });
      });

      commit('setCountries', countries);
      commit('setLoading', false);
    },
    async addCountry({commit}, payload) {
      await db.collection('countries').add(payload).then((doc) => {
        commit('addCountry', {...payload, id: doc.id});
      });
    },
    async updateCountry({commit, state}, payload) {
      await db.collection('countries').doc(state.activeCountryId).update(payload).then((doc) => {
        commit('updateCountry', {...payload, id: state.activeCountryId});
      })
    },
    async removeCountry({commit, state}, payload) {
      await db.collection('countries').doc(payload).delete();

      commit('removeCountry', payload);
    },
  }
});

export default store;
