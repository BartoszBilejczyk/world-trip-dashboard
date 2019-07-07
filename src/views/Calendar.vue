<template>
  <div class="calendar-view">
    <calendar-view
      :showDate="showDate"
      :events="events"
      :startingDayOfWeek="1"
      @click-event="goToCountry($event.id)"
    >
      <calendar-view-header
        slot="header"
        slot-scope="t"
        :header-props="t.headerProps"
        @input="setDateToShow" />
    </calendar-view>
  </div>
</template>

<script>
  import {
    CalendarView,
    CalendarViewHeader,
    CalendarMathMixin,
  } from 'vue-simple-calendar'
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'calendar',
    components: {
      CalendarView,
      CalendarViewHeader
    },
    data() {
      return {
        showDate: new Date(),
        weatherData: []
      }
    },
    computed: {
      ...mapState(['countries']),

      events() {
        return this.countries.map(c => (
          {
            id: c.id,
            startDate: c.startDate,
            endDate: c.endDate,
            title: c.name
          }
        ))
      }
    },
    methods: {
      ...mapMutations(['setActiveCountry']),

      setDateToShow(d) {
        this.showDate = d;
      },
      goToCountry(id) {
        this.setActiveCountry(id);
        this.$router.push('/country')
      }
    }
  }
</script>

<style lang="scss">
  .calendar-view {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;

    .cv-wrapper {
      display: block;
      height: auto;
      min-height: 600px;
      max-height: 600px;
      width: 100%;
      max-width: 800px;
      background: $gray;
      margin: 40px 0;
      background: transparent;
      align-items: center;
      vertical-align: middle;

      .cv-header-days {
        margin-bottom: $ui-default-measure3x;
      }

      * {
        border: none;
      }

      .cv-weeks {
        min-height: 400px;
      }

      .cv-day {
        justify-content: center;
        height: 60px;
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

      .cv-header {
        margin-bottom: $ui-default-measure;

        * {
          background: transparent;
          border: none;
        }
      }

      .periodLabel {
        justify-content: center;
      }

      .cv-event {
        background: $primary;
        color: white;
        border: 2px solid $primary;
        border-radius: 8px;
        top: $ui-default-measure3x !important;
        height: 28px;
      }
    }
  }
</style>
