<template>
  <div class="container">
    <vue-frappe
      id="totalCostData"
      :labels="labels"
      type="bar"
      :height="300"
      :colors="['#4C56C0']"
      :dataSets="totalCostData">
    </vue-frappe>
    <vue-frappe
      id="flightCostData"
      :labels="labels"
      type="bar"
      :height="300"
      :colors="['#4C56C0']"
      :dataSets="flightCostData">
    </vue-frappe>
    <vue-frappe
      id="accommodationCostData"
      :labels="labels"
      type="bar"
      :height="300"
      :colors="['#4C56C0']"
      :dataSets="accommodationCostData">
    </vue-frappe>
    <vue-frappe
      id="lifeCostData"
      :labels="labels"
      type="bar"
      :height="300"
      :colors="['#4C56C0']"
      :dataSets="lifeCostData">
    </vue-frappe>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    name: 'budget',
    computed: {
      ...mapGetters(['allCountriesTotalCost']),

      labels() {
        return this.allCountriesTotalCost.map(item => item.name)
      },
      totalCostData() {
        const values = this.allCountriesTotalCost.map(item => Number(item.totalCost));

        return [{
          name: 'Total Cost',
          chartType: 'bar',
          values
        }] || []
      },
      flightCostData() {
        const values = this.allCountriesTotalCost.map(item => Number(item.flightsCost));

        return [{
          name: 'Flight Cost',
          chartType: 'bar',
          values
        }] || []
      },
      accommodationCostData() {
        const values = this.allCountriesTotalCost.map(item => Number(item.accommodationCost));

        return [{
          name: 'accommodation Cost',
          chartType: 'bar',
          values
        }] || []
      },
      lifeCostData() {
        const values = this.allCountriesTotalCost.map(item => Number(item.lifeCost));

        return [{
          name: 'Life Cost',
          chartType: 'bar',
          values
        }] || []
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
