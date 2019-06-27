<template>
  <div class="navigation">
    <BaseSearch
      :options="countriesNames"
      @on-change="setCountry"
    />
    <BaseButton>Add new country</BaseButton>
  </div>
</template>

<script>
  import { db } from '@/db';

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
      setCountry(country) {
        console.log(country)
        // set country in store
      }
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
    justify-content: flex-end;

  }
</style>