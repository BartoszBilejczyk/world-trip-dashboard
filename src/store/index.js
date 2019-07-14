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
    currentMonth: null,
    user: {
      isAdmin: false
    }
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
    setCurrentUser(state, payload) {
      state.user = payload
    }
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
          flightsCost: Number(flightsCost.toFixed()),
          accommodationCost: Number(accommodationCost.toFixed()),
          lifeCost: Number(lifeCost.toFixed()),
          totalCost: Number(flightsCost + accommodationCost + lifeCost),
          priceIndex: Number(getters.selectedCountry.priceIndex)
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
    },
    allCountriesTotalCost(state) {
      const countries = state.countries.map(c => {
        let flightsCost = 0;
        let accommodationCost = 0;
        let lifeCost = 0;

        const transport = 15;
        const food = 45;
        const other = 10;
        const fun = 20;

        c.accommodation.forEach(acc => {
          accommodationCost += ((Number(acc.priceMin) + Number(acc.priceMax)) / 2) * acc.days
        });

        c.flights.forEach(flight => {
          flightsCost += ((Number(flight.priceMin) + Number(flight.priceMax)) / 2) + 120; // 120 is price for luggage
        });

        c.accommodation.forEach(acc => {
          lifeCost += c.priceIndex * acc.days * (transport + food + other + fun);
        });

        return {
          name: c.name,
          flightsCost: Number(flightsCost.toFixed()),
          accommodationCost: Number(accommodationCost.toFixed()),
          lifeCost: Number(lifeCost.toFixed()),
          totalCost: Number(flightsCost + accommodationCost + lifeCost),
          priceIndex: Number(c.priceIndex)
        };
      }).sort((a, b) => {
        if (a.totalCost > b.totalCost) {
          return 1;
        }
        if (b.totalCost > a.totalCost) {
          return -1;
        }
        return 0;
      });

      let totalFlightsCost = 0;
      let totalAccommodationCost = 0;
      let totalLifeCost = 0;
      let totalCost = 0;

      countries.forEach(c => {
        totalFlightsCost += Number(c.flightsCost);
        totalAccommodationCost += Number(c.accommodationCost);
        totalLifeCost += Number(c.lifeCost);
        totalCost += Number(c.flightsCost) + Number(c.accommodationCost) + Number(c.lifeCost);
      });

      return {
        countries,
        totalFlightsCost,
        totalAccommodationCost,
        totalLifeCost,
        totalCost
      }
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
      commit('setActiveCountry', countries[0].id);
      commit('setLoading', false);
    },
    async addCountry({commit}, payload) {
      await db.collection('countries').add(payload).then((doc) => {
        commit('addCountry', {...payload, id: doc.id});
      });
    },
    async updateCountry({commit, state}, payload) {
      await db.collection('countries').doc(state.activeCountryId).update(payload).then(() => {
        commit('updateCountry', {...payload, id: state.activeCountryId});
      })
    },
    async removeCountry({commit, state}, payload) {
      await db.collection('countries').doc(payload).delete();

      commit('removeCountry', payload);
    },
    async addUser({commit}, {data, email}) {
      await db.collection('users').doc(data.user.uid).set({email});
      commit('setCurrentUser', {email});
    }
  }
});

export default store;
