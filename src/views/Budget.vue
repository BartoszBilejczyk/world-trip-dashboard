<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <Chart
          v-if="dataAvailable"
          chart-id="totalCostData"
          :chart-data="{ labels, datasets: totalCostData}"
          :options="options"
        />
      </div>
      <div class="col-6">
        <Chart
          v-if="dataAvailable"
          chart-id="flightCostData"
          :chart-data="{ labels, datasets: flightCostData}"
          :options="options"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <Chart
          v-if="dataAvailable"
          chart-id="accommodationCostData"
          :chart-data="{ labels, datasets: accommodationCostData}"
          :options="options"
        />
      </div>
      <div class="col-6">
        <Chart
          v-if="dataAvailable"
          chart-id="lifeCostData"
          :chart-data="{ labels, datasets: lifeCostData}"
          :options="options"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Chart from '../components/Chart.js'

  export default {
    components: { Chart },
    name: 'budget',
    data() {
      return {
        options: { //Chart.js options
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    computed: {
      ...mapGetters(['allCountriesTotalCost']),

      labels() {
        return this.allCountriesTotalCost.countries.map(item => item.name) || []
      },
      totalCostData() {
        return [{
          label: 'Total Cost',
          backgroundColor: '#4C56C0',
          data: this.allCountriesTotalCost.countries.map(item => Number(item.totalCost))
        }] || []
      },
      flightCostData() {
        return [{
          label: 'Flight Cost',
          backgroundColor: '#4C56C0',
          data: this.allCountriesTotalCost.countries.map(item => Number(item.flightsCost))
        }] || []
      },
      accommodationCostData() {
        return [{
          label: 'Accommodation Cost',
          backgroundColor: '#4C56C0',
          data: this.allCountriesTotalCost.countries.map(item => Number(item.accommodationCost))
        }] || []
      },
      lifeCostData() {
        return [{
          label: 'Life Cost',
          backgroundColor: '#4C56C0',
          data: this.allCountriesTotalCost.countries.map(item => Number(item.lifeCost))
        }] || []
      },
      dataAvailable() {
        return this.labels.length &&
          this.totalCostData.length &&
          this.flightCostData.length &&
          this.accommodationCostData.length &&
          this.lifeCostData.length
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
