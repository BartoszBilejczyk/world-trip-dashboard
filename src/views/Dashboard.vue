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
            <hr class="divider divider--white" />
            <p class="copy copy--color-white">Total cost: {{ country.totalCost }}</p>
            <hr class="divider divider--white" />
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
                  <span class="copy--bold">{{ flight.from }} to {{ flight.to }}</span>
                  <span>/</span>
                  <span>{{ flight.priceMin }} - {{ flight.priceMax }}</span>
                  <a
                    :href="`https://www.google.com/flights?hl=pl#flt=${flight.fromCode}.${flight.toCode}.${moment(country.startDate).format('YYYY-MM-DD')};c:PLN;e:1;sd:1;t:f;tt:o`"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <button>Search</button>
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
                  <span class="copy--bold">{{ accommodation.city }}</span>
                  <span>/</span>
                  <span>{{ accommodation.priceMin }} - {{ accommodation.priceMax }}</span>
                  <a
                    :href="`https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&query=${accommodation.city}&search_type=filter_change&checkin=${moment(country.startDate).format('YYYY-MM-DD')}&checkout=${moment(country.startDate).add(accommodation.days, 'd').format('YYYY-MM-DD')}&adults=1&room_types%5B%5D=Private%20room&room_types%5B%5D=Shared%20room&s_tag=8DWMm8pZ`"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <button>Search</button>
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
              <div class="costs__budget">
                <div
                  class="c100 big"
                  :class="`p${country.totalCost / 100000 * 100}`"

                >
                  <span>{{ country.totalCost / 100000 * 100 }}%</span>
                  <div class="slice">
                    <div class="bar"></div>
                    <div class="fill"></div>
                  </div>
                </div>
              </div>

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
          <BaseButton>Add new</BaseButton>

          <div
            v-for="country in countries"
            :key="country.name"
          >
            {{ country.name }}
            <button @click="remove(country.id)">remove</button>
            <button @click="elo2(country)">update elo melo</button>
          </div>
          <button @click="elo">click to add France</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { db } from '@/db';
  import { GeoPoint } from '@/db';
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
      // to remove
      async elo() {
        await db.collection('countries').add({
          name: 'Poland',
          createdAt: this.moment().format(),
          startDate: this.moment(new Date(2019, 7, 1)).format(),
          endDate: this.moment(new Date(2019, 7, 11)).format(),
          cities: ['Melbourne', 'Cairns', 'Sydney'],
          visa: true,
          visaCost: 100,
          accommodation: [
            {
              city: 'Melbourne',
              priceMin: 200,
              priceMax: 300,
              days: 4
            },
            {
              city: 'Cairns',
              priceMin: 200,
              priceMax: 300,
              days: 5
            },
            {
              city: 'Sydney',
              priceMin: 200,
              priceMax: 300,
              days: 3
            },
          ],
          flights: [
            {
              from: 'Singapore',
              fromCode: 'SIN',
              to: 'Cairns',
              toCode: 'CNS',
              priceMin: 200,
              priceMax: 300
            },
            {
              from: 'Singapore',
              fromCode: 'SIN',
              to: 'Cairns',
              toCode: 'CNS',
              priceMin: 200,
              priceMax: 300
            },
            {
              from: 'Singapore',
              fromCode: 'SIN',
              to: 'Cairns',
              toCode: 'CNS',
              priceMin: 200,
              priceMax: 300
            }
          ],
          costs: {

          },
          totalCost: 2000,
          priceIndex: 1.5,
          notes: ['Note 1', 'Note 2']
        })
      },
      async elo2(country) {
        await db.collection('countries').doc(country.id).update({ eloMelo: [...country.eloMelo, { chuj: 'ci w dupe'}] })
      },
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

      > * {
        margin-right: 15px;
      }
    }
  }

  .costs__budget {
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
  }
</style>
