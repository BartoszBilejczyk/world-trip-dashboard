<template>
  <div class="dashboard">
    <div class="dashboard--main">
      <div class="row">
        <div class="col-5">
          <div class="base-box">
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
        <div class="col-7">
          <div class="base-box">

          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="base-box">
            <div 
              v-for="country in countries"
              :key="country.name"
            >
              {{ country.name }}
              <button @click="remove(country.id)">remove</button>
            </div>
            <button @click="elo">click to add France</button>
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
    </div>
  </div>
</template>

<script>
  import { db } from '@/db';
  import { GeoPoint } from '@/db';
  import { firestore } from 'firebase';
  import Search from '@/components/Search'

  export default {
    name: 'dashboard',
    components: {
      Search
    },
    data() {
      return {
        countries: [],
      }
    },
    firestore: {
      countries: db.collection('countries')
    },
    methods: {
      // to remove
      async elo() {
        await db.collection('countries').add({
          name: 'Australia',
          createdAt: firestore.FieldValue.serverTimestamp(),
          startDate: null,
          endDate: null,
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
      padding: 60px 80px 60px;
      background: $gray;
      flex: 1;
    }

    &--side {
      min-width: 450px;
      box-shadow: 0px 0px 20px 10px rgba(0,0,0,0.03);
      z-index: 20;
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
</style>
