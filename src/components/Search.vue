<template>
  <div class="search">
    <BaseSearch
      :value="selectedCountry ? selectedCountry.id : ''"
      :options="countriesNames"
      :label="label"
      @on-change="setActiveCountry"
    />
  </div>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex';

  import BaseSearch from '@/components/BaseSearch'
  import BaseButton from '@/components/BaseButton'

  export default {
    name: 'Navigation',
    components: {
      BaseSearch,
      BaseButton
    },
    props: {
      label: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapState(['countries']),
      ...mapGetters(['selectedCountry']),

      countriesNames() {
        return this.countries
          .sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
          .map(o => ({
            label: o.name,
            value: o.id
          })
        );
      }
    },
    methods: {
      ...mapMutations(['setActiveCountry'])
    }
  }
</script>

<style scoped lang="scss">
  .search {
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-end;
  }
</style>
