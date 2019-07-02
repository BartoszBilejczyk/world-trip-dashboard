<template>
  <div class="navigation">
    <BaseSearch
      :options="countriesNames"
      @on-change="fetchActiveCountry"
    />
  </div>
</template>

<script>
  import { db } from '@/db';
  import { mapActions } from 'vuex'

  import BaseSearch from '@/components/BaseSearch'
  import BaseButton from '@/components/BaseButton'

  export default {
    name: 'Navigation',
    components: {
      BaseSearch,
      BaseButton
    },
    data() {
      return {
        countries: [],
      }
    },
    computed: {
      countriesNames() {
        return this.countries.map(o => ({
          label: o.name,
          value: o.id
        }));
      }
    },
    firestore: {
      countries: db.collection('countries')
    },
    methods: {
      ...mapActions(['fetchActiveCountry'])
    }
  }
</script>

<style scoped lang="scss">
  .logo {
    max-width: 100px;
    height: auto;
  }

  .navigation {
    display: flex;
    justify-content: center;

  }
</style>