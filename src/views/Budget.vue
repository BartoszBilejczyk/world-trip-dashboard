<template>
  <div class="container">
    <div class="charts">
      <div class="row row--wrap">
        <div class="col-sm-12 col-6">
          <Chart
            v-if="dataAvailable"
            class="chart"
            chart-id="totalCostData"
            :chart-data="{ labels, datasets: totalCostData}"
            :options="options"
          />
        </div>
        <div class="col-sm-12 col-6">
          <Chart
            v-if="dataAvailable"
            class="chart"
            chart-id="flightCostData"
            :chart-data="{ labels, datasets: flightCostData}"
            :options="options"
          />
        </div>
      </div>
      <div class="row row--wrap">
        <div class="col-sm-12 col-6">
          <Chart
            v-if="dataAvailable"
            class="chart"
            chart-id="accommodationCostData"
            :chart-data="{ labels, datasets: accommodationCostData}"
            :options="options"
          />
        </div>
        <div class="col-sm-12 col-6">
          <Chart
            v-if="dataAvailable"
            class="chart"
            chart-id="lifeCostData"
            :chart-data="{ labels, datasets: lifeCostData}"
            :options="options"
          />
        </div>
      </div>
      <div class="row row--wrap">
        <div class="col-sm-12 col-6">
          <Chart
            v-if="dataAvailable"
            class="chart"
            chart-id="priceIndexData"
            :chart-data="{ labels, datasets: priceIndexData}"
            :options="options"
          />
        </div>
        <div class="col-sm-12 col-6">
          <Chart
            v-if="dataAvailable"
            class="chart"
            chart-id="accummulatedCostData"
            :chart-data="{ labels, datasets: accummulatedCostData}"
            :options="options"
          />
        </div>
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
        options: { // Chart.js options
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
          label: 'Total Cost by Country',
          backgroundColor: '#4C56C0',
          data: this.allCountriesTotalCost.countries.map(item => item.totalCost)
        }] || []
      },
      flightCostData() {
        return [{
          label: 'Flight Cost by Country',
          backgroundColor: '#4C56C0',
          data: this.allCountriesTotalCost.countries.map(item => item.flightsCost)
        }] || []
      },
      accommodationCostData() {
        return [{
          label: 'Accommodation Cost by Country',
          backgroundColor: '#4C56C0',
          data: this.allCountriesTotalCost.countries.map(item => item.accommodationCost)
        }] || []
      },
      lifeCostData() {
        return [{
          label: 'Life Cost by Country',
          backgroundColor: '#4C56C0',
          data: this.allCountriesTotalCost.countries.map(item => item.lifeCost)
        }] || []
      },
      priceIndexData() {
        return [{
          label: 'Price Indexes by Country',
          backgroundColor: '#4C56C0',
          data: this.allCountriesTotalCost.countries.map(item => item.priceIndex)
        }] || []
      },
      accummulatedCostData() {
        let accummulatedCost = 0;

        const data = this.allCountriesTotalCost.countries.map(item => {
          accummulatedCost += item.totalCost;
          return accummulatedCost;
        });

        return [{
          label: 'Accumulated Cost',
          backgroundColor: '#4C56C0',
          data
        }] || []
      },
      dataAvailable() {
        return this.labels.length &&
          this.totalCostData.length &&
          this.flightCostData.length &&
          this.accommodationCostData.length &&
          this.lifeCostData.length &&
          this.priceIndexData.length &&
          this.accummulatedCostData.length
      }
    }
  }
</script>

<style scoped lang="scss">
  .charts {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    padding-bottom: 100px;

    @include sm-up {
      padding-bottom: 0;
    }
  }

  .chart,
  .chart canvas {
    max-height: 30vh !important;
    height: 30vh !important;
  }
</style>
