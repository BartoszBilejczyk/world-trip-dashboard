<template>
  <div v-if="country">
    <h1 class="heading heading--primary heading--color-white">
      {{ country.name }}
    </h1>
    <p class="copy copy--color-white">
      Cities:
      <span
        v-for="city in Array.of(country.cities)"
        :key="city"
      >

       {{ city }}
      </span>
    </p>
    <hr class="divider divider--white"/>
    <p class="copy copy--color-white">
      Total cost: {{ selectedCountryTotalCost.totalCost }}
    </p>
    <hr class="divider divider--white"/>
    <p class="copy copy--color-white">
      Visa: {{ country.visaCost }}
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'country-main-info',
    props: {
      country: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      ...mapGetters(['selectedCountryTotalCost'])
    }
  }
</script>

<style scoped lang="scss">
  .city {
    padding: 0 10px;
  }
</style>
