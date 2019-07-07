<template>
  <div class="country">
    <div class="country__main">
      <div class="row">
        <div class="col-4">
          <div
            class="base-box country__main-info"
            :style="{ backgroundImage: selectedCountry.name && 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(' + require(`../static/backgrounds/${selectedCountry.name.toLowerCase().split(' ').join('')}_background.jpg`) + ')' }"
          >
            <h1 class="heading heading--primary heading--color-white">{{ selectedCountry.name }}</h1>
            <p class="copy copy--color-white" v-if="selectedCountry.cities">
              Cities:
              <span v-for="city in Array.of(selectedCountry.cities)">
               {{ city }}
              </span>
            </p>
            <hr class="divider divider--white" v-if="selectedCountry.totalCost" />
            <p class="copy copy--color-white" v-if="selectedCountry.totalCost">Total cost: {{ selectedCountry.totalCost }}</p>
            <hr class="divider divider--white" v-if="selectedCountry.visa" />
            <p class="copy copy--color-white" v-if="selectedCountry.visa">
              Visa: {{ selectedCountry.visaCost }}
            </p>
          </div>
        </div>
        <div class="col-4">
          <div class="base-box">
            <calendar-view
              :showDate="events[0].startDate"
              :events="events"
              :startingDayOfWeek="1"
            >
              <calendar-view-header
                slot="header"
                slot-scope="t"
                :header-props="t.headerProps"
                @input="setDateToShow" />

              <!--<div-->
              <!--slot="header"-->
              <!--slot-scope="props"-->
              <!--:header-props="props.headerProps"-->
              <!--@input="setDateToShow"-->
              <!--&gt;-->
              <!--<div class="calendar-header">-->
              <!--<button @click="$emit('input', props.headerProps.previousFullPeriod)"><</button>-->
              <!--<h2>{{ props.headerProps.currentPeriodLabel }}</h2>-->
              <!--<button @click="$emit('input', props.headerProps.nextFullPeriod)">></button>-->
              <!--</div>-->
              <!--</div>-->
            </calendar-view>
          </div>
        </div>
        <div class="col-4">
          <div class="base-box">
            <Weather :cities="selectedCountry.cities"></Weather>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <div class="base-box">
            <h2 class="heading heading--section">Flights</h2>

            <div class="flights">
              <div v-for="flight in selectedCountry.flights">
                <div class="flights-item">
                  <div>
                    <span class="copy--bold flights-item-from-to">{{ flight.from }} to {{ flight.to }}</span>
                    <span> / </span>
                    <span>{{ flight.priceMin }} - {{ flight.priceMax }}</span>
                  </div>
                  <a
                    :href="`https://www.google.com/flights?hl=pl#flt=${flight.fromCode}.${flight.toCode}.${moment(selectedCountry.startDate).format('YYYY-MM-DD')};c:PLN;e:1;sd:1;t:f;tt:o`"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <BaseButton filled icon="arrow-right" iconRight>Search</BaseButton>
                  </a>
                </div>
                <hr class="divider">
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="base-box">
            <h2 class="heading heading--section">Accommodation</h2>
            <div class="accommodation">
              <div v-for="accommodation in selectedCountry.accommodation">
                <div class="accommodation-item">
                  <div>
                    <span class="copy--bold">{{ accommodation.city }}</span>
                    <span> / </span>
                    <span>{{ accommodation.priceMin }} - {{ accommodation.priceMax }}</span>
                  </div>
                  <a
                    :href="`https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&query=${accommodation.city}&search_type=filter_change&checkin=${moment(selectedCountry.startDate).format('YYYY-MM-DD')}&checkout=${moment(selectedCountry.startDate).add(accommodation.days, 'd').format('YYYY-MM-DD')}&adults=1&room_types%5B%5D=Private%20room&room_types%5B%5D=Shared%20room&s_tag=8DWMm8pZ`"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <BaseButton filled icon="arrow-right" iconRight>Search</BaseButton>
                  </a>
                </div>
                <hr class="divider">
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="base-box">
            <h2 class="heading heading--section">Costs</h2>

            <div class="costs" v-if="selectedCountryTotalCost">
              <p class="copy">Total cost: {{ selectedCountryTotalCost.totalCost }}</p>
              <p class="copy">Flights cost: {{ selectedCountryTotalCost.flightsCost }}</p>
              <p class="copy">Accommodation cost: {{ selectedCountryTotalCost.accommodationCost }}</p>
              <p class="copy">Life cost: {{ selectedCountryTotalCost.lifeCost }}</p>
              <hr class="divider" />
              <p class="copy">Price Index: {{ selectedCountry.priceIndex }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="country__side">
      <Search />

      <div class="notes">
        <div class="notes-header">
          <h1>Notes</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import {
    CalendarView,
    CalendarViewHeader,
  } from 'vue-simple-calendar'

  import Search from '@/components/Search'
  import BaseButton from '@/components/BaseButton'
  import Weather from '@/components/Weather'

  export default {
    name: 'country',
    components: {
      Search,
      BaseButton,
      CalendarView,
      CalendarViewHeader,
      Weather
    },
    data() {
      return {
        showDate: new Date(),
      }
    },
    computed: {
      ...mapState(['countries']),
      ...mapGetters(['selectedCountry', 'selectedCountryTotalCost']),

      attrs() {
        return [
          {
            key: 'today',
            highlight: {
              backgroundColor: '#4C56C0',
              // Other properties are available too, like `height` & `borderRadius`
            },
            contentStyle: {
              color: '#FFF',
            },
            dates: [
              { start: this.selectedCountry.startDate, end: this.selectedCountry.endDate},
            ]
          }
        ]
      },
      events() {
        return [{
          id: this.selectedCountry.id,
          startDate: this.selectedCountry.startDate,
          endDate: this.selectedCountry.endDate,
          title: ' '
        }]
      }
    },
    methods: {
      setDateToShow(d) {
        this.showDate = d;
      },
      setNewDate(a) {
        console.log(a)
      }
    }
  }
</script>

<style scoped lang="scss">
  .country {
    height: 100vh;
    display: flex;

    &__main {
      padding: 60px;
      background: $gray;
      flex: 1;

      &-info {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
    }

    &__side {
      width: 350px;
      box-shadow: 0px 0px 20px 10px rgba(0,0,0,0.03);
      z-index: 20;
      padding: 60px 45px;
    }

    .row {
      height: calc((100vh - 160px) / 2);

      > div {
        height: 100%;
      }
    }

    .base-box {
      height: inherit;
    }
  }

  .notes {
    &-header {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }

  .divider {
    border: none;
    height: 1px;
    width: 100%;
    background: $text;

    &--white {
      background: $white;
    }
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .city {
    padding: 0 10px;
  }

  .flights,
  .accommodation {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;

        > * {
          margin-right: $ui-default-measure;
        }
      }

      .base-btn {
        margin-left: $ui-default-measure;
      }
    }
  }

  .flights-item-from-to {
    display: inline-block;
  }

  .costs__budget {
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
  }

  .base-box .heading--section {
    margin: $ui-default-measure2x 0;
  }
</style>

<style lang="scss">
  .country {
    .cv-wrapper {
      display: block;
      height: auto;
      min-height: 340px;
      max-height: 340px;
      width: 100%;
      background: $gray;
      margin: 20px 0 40px;
      background: transparent;

      * {
        border: none;
      }

      .cv-day {
        justify-content: center;
        align-items: center;
      }

      .outsideOfMonth {
        opacity: 0.4;
      }

      .currentPeriod {
        @include font(25, 600);
      }

      .nextPeriod,
      .previousPeriod {
        @include font(25, 600);
      }

      .nextYear,
      .previousYear {
        display: none;
      }

      .cv-header {
        margin-bottom: $ui-default-measure;

        * {
          background: transparent;
          border: none;
        }

        &-nav {
          display: none;
        }
      }

      .periodLabel {
        justify-content: center;
      }

      .cv-event {
        background: transparent;
        border: 2px solid $primary;
        border-radius: 8px;
        top: 10px !important;
        height: 28px;
      }
    }
  }
</style>
