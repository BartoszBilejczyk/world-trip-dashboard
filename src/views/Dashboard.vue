<template>
  <div class="dashboard">
    <div class="dashboard--main">
      <div class="row">
        <div class="col-5">
          <div class="base-box">
            <div class="row" v-if="country">
              <p>{{ country.name }}</p>
              <p>
                Cities:
                <span v-for="city in country.cities">
                  {{ city }}
                </span>
              </p>
              <p>Total cost: {{ country.totalCost }}</p>
              <p v-if="country.visa">
                Visa: {{ country.visaCost }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div class="base-box">
            {{ country }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="base-box">

          </div>
        </div>
        <div class="col-4">
          <div class="base-box">
            {{ countries[0] }}
          </div>
        </div>
        <div class="col-4">
          <div class="base-box"></div>
        </div>
      </div>
    </div>
    <div class="dashboard--side">
      <Search />

      <v-calendar :attributes="attrs">
      </v-calendar>

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
    methods: {
      // to remove
      async elo() {
        await db.collection('countries').add({
          name: 'Poland',
          createdAt: this.moment().format(),
          startDate: this.moment(new Date(2019, 6, 1)).format(),
          endDate: this.moment(new Date(2019, 6, 11)).format(),
          cities: ['Melbourne', 'Cairns', 'Sydney'],
          visa: true,
          visaCost: 100,
          airbnbPrice: 50,
          flights: [
            {
              from: 'Singapore',
              to: 'Cairns',
              price: 200
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
      }


      // get country from store
    }
  }
</script>

<style scoped lang="scss">
  .dashboard {
    height: 100vh;
    display: flex;

    &--main {
      padding: 60px 80px;
      background: $gray;
      flex: 1;
    }

    &--side {
      width: 450px;
      box-shadow: 0px 0px 20px 10px rgba(0,0,0,0.03);
      z-index: 20;
      padding: 60px 45px;
    }

    .row {
      height: calc((100vh - 200px) / 2);

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
</style>
