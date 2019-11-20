<template>
  <div class="country">
    <div class="country__main">
      <Search label="Choose country" />

      <div class="row row--wrap">
        <div class="col-sm-12 col-4">
          <div
            class="base-box country__background"
            :style="{ backgroundImage: selectedCountry.name && 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(' + require(`../static/backgrounds/${selectedCountry.name.toLowerCase().split(' ').join('')}_background.jpg`) + ')' }"
          >
            <CountryMainInfo :country="selectedCountry" />
          </div>
        </div>
        <div class="col-sm-12 col-4">
          <div class="base-box">
            <CalendarView
              :showDate="events[0].startDate"
              :events="events"
              :startingDayOfWeek="1"
            >
              <CalendarViewHeader
                slot="header"
                slot-scope="t"
                :header-props="t.headerProps"
                @input="setDateToShow"
              />
            </CalendarView>
          </div>
        </div>
        <div class="col-sm-12 col-4">
          <div class="base-box">
            <Weather :cities="selectedCountry.cities" />
          </div>
        </div>
      </div>
      <div class="row row--wrap">
        <div class="col-sm-12 col-5">
          <div class="base-box">
            <FlightList :flights="selectedCountry.flights" />
          </div>
        </div>
        <div class="col-sm-12 col-4">
          <div class="base-box">
            <AccommodationList :accommodation="selectedCountry.accommodation" />
          </div>
        </div>
        <div class="col-sm-12 col-3">
          <div class="base-box">
            <Costs :country="selectedCountry" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="country__side"
      v-if="selectedCountry.notes && selectedCountry.notes.length"
    >
      <Notes :notes="selectedCountry.notes" />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';

  import Search from '@/components/Search';
  import BaseButton from '@/components/BaseButton';
  import Weather from '@/components/Weather';
  import FlightList from '@/components/FlightList';
  import AccommodationList from '@/components/AccommodationList';
  import Costs from '@/components/Costs';
  import Notes from '@/components/Notes';
  import CountryMainInfo from '@/components/CountryMainInfo';

  export default {
    name: 'country',
    components: {
      Search,
      BaseButton,
      CalendarView,
      CalendarViewHeader,
      Weather,
      FlightList,
      AccommodationList,
      Costs,
      Notes,
      CountryMainInfo
    },
    data() {
      return {
        showDate: new Date()
      }
    },
    computed: {
      ...mapGetters(['selectedCountry']),

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
        this.showDate = new Date(d);
      }
    }
  }
</script>

<style scoped lang="scss">
  .country {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 100px;
    overflow-y: auto;

    @include sm-up {
      min-height: 100vh;
      flex-direction: row;
      padding-bottom: 0;
    }

    &__main {
      padding: 20px 60px 60px;
      background: $gray;
      flex: 1;
    }

    &__background {
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    &__side {
      z-index: 20;
      padding: 60px 45px;

      @include sm-up {
        max-width: 350px;
        width: 350px;
        flex: 1;
      }
    }

    .row {
      @include sm-up {
        height: 370px;
        min-height: calc((100vh - 180px) / 2);
      }

      > div {
        height: 100%;
      }
    }

    .base-box {
      height: inherit;
    }
  }
</style>

<style lang="scss">
  .country {
    .cv-wrapper {
      display: block;
      height: auto;
      min-height: 370px;
      max-height: 370px;
      width: 100%;
      background: $gray;
      margin: 0 0 40px;
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
