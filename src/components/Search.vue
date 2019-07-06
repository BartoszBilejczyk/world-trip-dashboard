<template>
  <div class="navigation">
    <BaseSearch
      :options="countriesNames"
      @on-change="setActiveCountry"
    />
  </div>
</template>

<script>
  import { db } from '@/db';
  import { mapMutations } from 'vuex';

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
      ...mapMutations(['setActiveCountry'])
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
