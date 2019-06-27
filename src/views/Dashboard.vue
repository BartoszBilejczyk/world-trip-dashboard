<template>
  <div class="dashboard">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-for="country in countries">
      {{ country.name }}
      <button @click="remove(country.id)">remove</button>
    </div>
    <button @click="elo">click to add France</button>
  </div>
</template>

<script>
  import { db } from '@/db';
  import { GeoPoint } from '@/db';
  import { firestore } from 'firebase';

  export default {
    name: 'dashboard',
    components: {
    },
    data() {
      return {
        countries: [],
      }
    },
    firestore: {
      countries: db.collection('countries').orderBy('createdAt')
    },
    methods: {
      async elo() {
        await db.collection('countries').add({
          name: 'France 3',
          location: new GeoPoint(48.8588377, 2.2770206),
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      },
      async remove(id) {
        await db.collection('countries').doc(id).delete();
      }
    }
  }
</script>
