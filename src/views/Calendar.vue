<template>
  <div class="calendar-view">
    <CalendarView
      :showDate="showDate"
      :events="events"
      :startingDayOfWeek="1"
      @click-event="goToCountry($event.id)"
    >
      <CalendarViewHeader
        slot="header"
        slot-scope="t"
        :header-props="t.headerProps"
        @input="handleDateChange" />
    </CalendarView>
    <ul class="calendar-view__country-list">
      <li
        class="calendar-view__country-list-item"
        v-for="country in countriesCurrentMonth"
        @click="goToCountry(country.id)"
      >
        <h2 class="heading heading--section">{{ country.name }}</h2>
        <p class="copy copy--large">
          {{ moment(country.startDate).format("DD MMM YYYY") }} to {{ moment(country.endDate).format("DD MMM YYYY") }}
        </p>
        <div
          class="calendar-image"
          :style="{
            backgroundImage: country.name && 'url(' + require(`../static/backgrounds/${country.name.toLowerCase().split(' ').join('')}_background.jpg`) + ')',
            maxHeight: `calc(100vh / ${countriesCurrentMonth.length} - 160px)`
          }"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
  import { mapState, mapMutations, mapGetters } from 'vuex';

  import AppConfig from '../app.config';

  export default {
    name: 'calendar',
    components: {
      CalendarView,
      CalendarViewHeader
    },
    data() {
      return {
        showDate: new Date(AppConfig.tripStartDate)
      }
    },
    computed: {
      ...mapState(['countries', 'currentMonth']),
      ...mapGetters(['countriesCurrentMonth']),

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
    mounted() {
      this.setCurrentMonth(this.showDate);
    },
    methods: {
      ...mapMutations(['setActiveCountry', 'setCurrentMonth']),

      setDateToShow(d) {
        this.showDate = d;
      },
      goToCountry(id) {
        this.setActiveCountry(id);
        this.$router.push('/country')
      },
      handleDateChange(d) {
        this.showDate = d;
        this.setCurrentMonth(this.showDate);
      }
    }
  }
</script>

<style scoped lang="scss">
  .calendar-view__country-list {
    padding-left: 80px;
    display: flex;
    flex-flow: row wrap;
    width: 700px;
    justify-content: center;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: calc(50% - 20px);
      margin: 20px 10px;
      cursor: pointer;
    }
  }

  .calendar-image {
    margin-top: $ui-default-measure2x;
    width: 100%;
    min-height: 150px;
    height: 150px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

<style lang="scss">
  .calendar-view {
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 0 8%;

    .cv-wrapper {
      display: block;
      height: auto;
      min-height: 600px;
      max-height: 600px;
      width: 100%;
      max-width: 650px;
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
        display: none;
      }

      .nextPeriod,
      .previousPeriod {
        @include font(25, 600);
      }
      .nextYear,
      .previousYear {
        display: none;
      }

      .previousPeriod {
        margin-right: 120px;
      }

      .nextPeriod {
        margin-left: 80px;
      }

      .cv-header {
        margin-bottom: $ui-default-measure;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-bottom: $ui-default-measure3x;

        * {
          background: transparent;
          border: none;
        }
        
        &-nav {
          position: absolute;
        }
      }
      

      .periodLabel {
        justify-content: center;
        padding-left: 30px;
      }

      .cv-event {
        background: $primary;
        color: white;
        border: 2px solid $primary;
        border-radius: 8px;
        top: $ui-default-measure3x !important;
        height: 28px;
        text-align: center;
      }
    }

    button:focus {
      outline: none;
    }


    .cv-event.span1 {
      width: calc((100% / 7) - #{$ui-default-measure2x});
    }

    .cv-event.span2 {
      width: calc((200% / 7) - #{$ui-default-measure2x});
    }

    .cv-event.span3 {
      width: calc((300% / 7) - #{$ui-default-measure2x});
      text-align: center;
    }

    .cv-event.span4 {
      width: calc((400% / 7) - #{$ui-default-measure2x});
      text-align: center;
    }

    .cv-event.span5 {
      width: calc((500% / 7) - #{$ui-default-measure2x});
      text-align: center;
    }

    .cv-event.span6 {
      width: calc((600% / 7) - #{$ui-default-measure2x});
      text-align: center;
    }

    .cv-event.span7 {
      width: calc((700% / 7) - #{$ui-default-measure2x});
      text-align: center;
    }
  }
</style>
