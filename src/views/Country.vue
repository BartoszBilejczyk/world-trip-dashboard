<template>
  <div class="country">
    <div class="country__main">
      <div class="row">
        <div class="col-4">
          <div class="base-box country__main-info">
            <h1 class="heading heading--primary heading--color-white">{{ getOneCountry.name }}</h1>
            <p class="copy copy--color-white" v-if="getOneCountry.cities">
              Cities:
              <span v-for="city in Array.of(getOneCountry.cities)">
               {{ city }}
              </span>
            </p>
            <hr class="divider divider--white" v-if="getOneCountry.totalCost" />
            <p class="copy copy--color-white" v-if="getOneCountry.totalCost">Total cost: {{ getOneCountry.totalCost }}</p>
            <hr class="divider divider--white" v-if="getOneCountry.visa" />
            <p class="copy copy--color-white" v-if="getOneCountry.visa">
              Visa: {{ getOneCountry.visaCost }}
            </p>
          </div>
        </div>
        <div class="col-4">
          <div class="base-box">
            <h2 class="heading heading--section">Flights</h2>

            <div class="flights">
              <div v-for="flight in getOneCountry.flights">
                <div class="flights-item">
                  <div>
                    <span class="copy--bold flights-item-from-to">{{ flight.from }} to {{ flight.to }}</span>
                    <span> / </span>
                    <span>{{ flight.priceMin }} - {{ flight.priceMax }}</span>
                  </div>
                  <a
                    :href="`https://www.google.com/flights?hl=pl#flt=${flight.fromCode}.${flight.toCode}.${moment(getOneCountry.startDate).format('YYYY-MM-DD')};c:PLN;e:1;sd:1;t:f;tt:o`"
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
              <div v-for="accommodation in getOneCountry.accommodation">
                <div class="accommodation-item">
                  <div>
                    <span class="copy--bold">{{ accommodation.city }}</span>
                    <span> / </span>
                    <span>{{ accommodation.priceMin }} - {{ accommodation.priceMax }}</span>
                  </div>
                  <a
                    :href="`https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&query=${accommodation.city}&search_type=filter_change&checkin=${moment(getOneCountry.startDate).format('YYYY-MM-DD')}&checkout=${moment(getOneCountry.startDate).add(accommodation.days, 'd').format('YYYY-MM-DD')}&adults=1&room_types%5B%5D=Private%20room&room_types%5B%5D=Shared%20room&s_tag=8DWMm8pZ`"
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
                <span v-for="city in Array.of(getOneCountry.cities)">
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
              <AProgress :percent="getOneCountry.totalCost / 100000 * 100" />
              <p class="copy">Total cost: {{ getOneCountry.totalCost }}</p>
              <hr class="divider" />
              <p class="copy">Price Index: {{ getOneCountry.priceIndex }}</p>
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
    <div class="country__side">
      <Search />
      <v-calendar
        ref="calendar"
        :attributes="attrs"
      />

      <div class="notes">
        <div class="notes-header">
          <h1>Notes</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';

  import { db } from '@/db';
  import Search from '@/components/Search'
  import BaseButton from '@/components/BaseButton'
  import axios from 'axios'

  export default {
    name: 'country',
    components: {
      Search,
      BaseButton
    },
    data() {
      return {
        weatherData: []
      }
    },
    computed: {
      ...mapState(['countries']),
      ...mapGetters(['getOneCountry']),

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
              { start: this.getOneCountry.startDate, end: this.getOneCountry.endDate},
            ]
          }
        ]
      }
    },
    methods: {
      async getCurrentWeather(city) {
        await axios
          .get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&APPID=0741e0fc29ec393451e350d27c1db6d6`)
          .then(response => (this.weatherData = response.data))
      }
    }
  }
</script>

<style scoped lang="scss">
  .country {
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
