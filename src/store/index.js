import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment'

Vue.use(Vuex);

import { db } from '@/db';

const store = new Vuex.Store({
  state: {
    activeCountryId: '',
    countries: [],
    loading: false,
    currentMonth: null
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
    setCurrentMonth(state, payload) {
      state.currentMonth = payload
    },
  },
  getters: {
    selectedCountry(state) {
      return state.activeCountryId ? state.countries.find((c) => c.id === state.activeCountryId) : {}
    },
    selectedCountryTotalCost(state, getters) {
      if (state.activeCountryId) {
        let flightsCost = 0;
        let accommodationCost = 0;
        let lifeCost = 0;

        const transport = 15;
        const food = 45;
        const other = 10;
        const fun = 20;

        getters.selectedCountry.accommodation.forEach(acc => {
          accommodationCost += ((Number(acc.priceMin) + Number(acc.priceMax)) / 2) * acc.days
        });

        getters.selectedCountry.flights.forEach(flight => {
          flightsCost += ((Number(flight.priceMin) + Number(flight.priceMax)) / 2)
        });

        getters.selectedCountry.accommodation.forEach(acc => {
          lifeCost += getters.selectedCountry.priceIndex * acc.days * (transport + food + other + fun);
        });

        return {
          flightsCost: flightsCost.toFixed(),
          accommodationCost: accommodationCost.toFixed(),
          lifeCost: lifeCost.toFixed(),
          totalCost: flightsCost + accommodationCost + lifeCost
        };
      }
    },
    countriesCurrentMonth(state) {
      return state.countries.filter(c => {
        return (moment(c.startDate).month() === moment(state.currentMonth).month() || moment(c.endDate).month() === moment(state.currentMonth).month()) && moment(c.startDate).year() === moment(state.currentMonth).year()
      }).sort((a, b) => {
        if (a.startDate > b.startDate) {
          return 1;
        }
        if (b.startDate > a.startDate) {
          return -1;
        }
        return 0;
      });
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
