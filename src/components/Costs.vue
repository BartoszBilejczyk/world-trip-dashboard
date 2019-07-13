<template>
  <div>
    <h2 class="heading heading--section">Costs</h2>
    <div
      v-if="selectedCountryTotalCost"
      class="costs"
    >
      <p class="copy costs__item">
        <span>Total cost: </span><span class="copy--bold">{{ selectedCountryTotalCost.totalCost }}</span>
      </p>
      <hr class="divider" />
      <p class="copy costs__item">
        <span>Flights cost: </span><span class="copy--bold">{{ selectedCountryTotalCost.flightsCost }}</span>
      </p>
      <hr class="divider" />
      <p class="copy costs__item">
        <span>Accommodation cost: </span><span class="copy--bold">{{ selectedCountryTotalCost.accommodationCost }}</span>
      </p>
      <hr class="divider" />
      <p class="copy costs__item">
        <span>Life cost: </span><span class="copy--bold">{{ selectedCountryTotalCost.lifeCost }}</span>
      </p>
      <hr class="divider" />
      <p class="copy costs__item">
        <span>Price Index: </span><span class="copy--bold">{{ country.priceIndex }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'costs',
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
  .costs__item {
    display: flex;
    justify-content: space-between;
  }

  .costs__budget {
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
  }
</style>
