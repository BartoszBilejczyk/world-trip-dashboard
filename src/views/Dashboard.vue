<template>
  <div class="dashboard">
    <div class="dashboard__main">
      <div class="row">
        <div class="col-4">
          <div class="base-box dashboard__main-info">
            <h1 class="heading heading--primary heading--color-white">{{ country.name }}</h1>
            <p class="copy copy--color-white">
              Cities:
              <span v-for="city in country.cities">
               {{ city }}
              </span>
            </p>
            <hr class="divider divider--white" v-if="country.totalCost" />
            <p class="copy copy--color-white" v-if="country.totalCost">Total cost: {{ country.totalCost }}</p>
            <hr class="divider divider--white" v-if="country.visa" />
            <p class="copy copy--color-white" v-if="country.visa">
              Visa: {{ country.visaCost }}
            </p>
          </div>
        </div>
        <div class="col-4">
          <div class="base-box">
            <h2 class="heading heading--section">Flights</h2>

            <div class="flights">
              <div v-for="flight in country.flights">
                <div class="flights-item">
                  <div>
                    <span class="copy--bold flights-item-from-to">{{ flight.from }} to {{ flight.to }}</span>
                    <span> / </span>
                    <span>{{ flight.priceMin }} - {{ flight.priceMax }}</span>
                  </div>
                  <a
                    :href="`https://www.google.com/flights?hl=pl#flt=${flight.fromCode}.${flight.toCode}.${moment(country.startDate).format('YYYY-MM-DD')};c:PLN;e:1;sd:1;t:f;tt:o`"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <BaseButton filled icon="arrow-right" iconRight>Search</BaseButton>
                  </a>
                </div>
                <hr class="divider">
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="base-box">
            <h2 class="heading heading--section">Accommodation</h2>
            <div class="accommodation">
              <div v-for="accommodation in country.accommodation">
                <div class="accommodation-item">
                  <div>
                    <span class="copy--bold">{{ accommodation.city }}</span>
                    <span> / </span>
                    <span>{{ accommodation.priceMin }} - {{ accommodation.priceMax }}</span>
                  </div>
                  <a
                    :href="`https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&query=${accommodation.city}&search_type=filter_change&checkin=${moment(country.startDate).format('YYYY-MM-DD')}&checkout=${moment(country.startDate).add(accommodation.days, 'd').format('YYYY-MM-DD')}&adults=1&room_types%5B%5D=Private%20room&room_types%5B%5D=Shared%20room&s_tag=8DWMm8pZ`"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <BaseButton filled icon="arrow-right" iconRight>Search</BaseButton>
                  </a>
                </div>
                <hr class="divider">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <div class="base-box">
            <div class="flex">
              <h2 class="heading heading--section">Weather</h2>
              <div>
                <span v-for="city in country.cities">
                 <span
                   class="city"
                   @click="getCurrentWeather(city)"
                 >
                   {{ city }}
                 </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="base-box">
            <h2 class="heading heading--section">Costs</h2>

            <div class="costs">
              <AProgress :percent="country.totalCost / 100000 * 100" />
              <p class="copy">Total cost: {{ country.totalCost }}</p>
              <hr class="divider" />
              <p class="copy">Price Index: {{ country.priceIndex }}</p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="base-box">
            <h2 class="heading heading--section">Other information</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard__side">
      <Search />
      <v-calendar
        ref="calendar"
        :attributes="attrs"
      />

      <div class="notes">
        <div class="notes-header">
          <h1>Notes</h1>
          <div
            v-for="country in countries"
            :key="country.name"
          >
            {{ country.name }}
            <BaseButton filled @click="remove(country.id)">remove</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { db } from '@/db';
  import Search from '@/components/Search'
  import BaseButton from '@/components/BaseButton'
  import axios from 'axios'

  export default {
    name: 'dashboard',
    components: {
      Search,
      BaseButton
    },
    data() {
      return {
        countries: [],
        eloelo: this.country,
        weatherData: []
      }
    },
    firestore() {
      return {
        countries: db.collection('countries')
      };
    },
    computed: {
      country() {
        return this.countries.find((c) => c.id === this.$store.state.activeCountryId) || {}
      },
      attrs() {
        return [
          {
            key: 'today',
            highlight: {
              backgroundColor: '#4C56C0',
              // Other properties are available too, like `height` & `borderRadius`
            },
            contentStyle: {
              color: '#FFF',
            },
            dates: [
              { start: this.country.startDate, end: this.country.endDate},
            ]
          }
        ]
      }
    },
    mounted() {
      // Get reference to the calendar component
      const calendar = this.$refs.calendar;
      // Call method of the component
      const page = { month: 2, year: 2020 }; // February, 2020
      // Pass a date
      // Pass a page ({ month, year })
      calendar.moveNextMonth();
    },
    methods: {
      async remove(id) {
        await db.collection('countries').doc(id).delete();
      },
      async getCurrentWeather(city) {
        await axios
          .get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&APPID=0741e0fc29ec393451e350d27c1db6d6`)
          .then(response => (this.weatherData = response.data))
      }

      // get country from store
    }
  }
</script>

<style scoped lang="scss">
  .dashboard {
    height: 100vh;
    display: flex;

    &__main {
      padding: 60px 80px;
      background: $gray;
      flex: 1;

      &-info {
        background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('../assets/poland.jpg');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
    }

    &__side {
      width: 450px;
      box-shadow: 0px 0px 20px 10px rgba(0,0,0,0.03);
      z-index: 20;
      padding: 60px 45px;
    }

    .row {
      height: calc((100vh - 160px) / 2);

      > div {
        height: 100%;
      }
    }

    .base-box {
      height: inherit;
    }
  }

  .calendar {
    height: 350px;
    width: 100%;
    background: $gray;
    margin: 40px 0;
  }

  .notes {
    &-header {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }

  .divider {
    border: none;
    height: 1px;
    width: 100%;
    background: $text;

    &--white {
      background: $white;
    }
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .city {
    padding: 0 10px;
  }



  .flights,
  .accommodation {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;

        > * {
          margin-right: $ui-default-measure;
        }
      }

      .base-btn {
        margin-left: $ui-default-measure;
      }
    }
  }

  .flights-item-from-to {
    max-width: 100px;
    display: inline-block;
  }

  .costs__budget {
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
  }

  .base-box .heading--section {
    margin: $ui-default-measure2x 0;
  }
</style>
