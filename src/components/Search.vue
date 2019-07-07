<template>
  <div class="navigation">
    <BaseSearch
      :options="countriesNames"
      @on-change="setActiveCountry"
    />
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  import BaseSearch from '@/components/BaseSearch'
  import BaseButton from '@/components/BaseButton'

  export default {
    name: 'Navigation',
    components: {
      BaseSearch,
      BaseButton
    },
    computed: {
      ...mapState(['countries']),

      countriesNames() {
        return this.countries.map(o => ({
          label: o.name,
          value: o.id
        }));
      }
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
