<template>
  <div>
    <h2 class="heading heading--section">Costs</h2>
    <div
      v-if="selectedCountryTotalCost"
      class="costs"
    >
      <p class="copy">
        Total cost: {{ selectedCountryTotalCost.totalCost }}
      </p>
      <p class="copy">
        Flights cost: {{ selectedCountryTotalCost.flightsCost }}
      </p>
      <p class="copy">
        Accommodation cost: {{ selectedCountryTotalCost.accommodationCost }}
      </p>
      <p class="copy">
        Life cost: {{ selectedCountryTotalCost.lifeCost }}
      </p>
      <hr class="divider" />
      <p class="copy">
        Price Index: {{ country.priceIndex }}
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
  .costs__budget {
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
  }
</style>
