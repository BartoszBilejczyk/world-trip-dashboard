<template>
  <div>
    <h2 class="heading heading--section">Accommodation</h2>
    <div class="accommodation">
      <div
        v-for="acc in accommodation"
        :key="acc.city"
      >
        <div class="accommodation-item">
          <div>
            <span class="copy--bold">{{ acc.city }}</span>
            <span> / </span>
            <span>{{ acc.priceMin }} - {{ acc.priceMax }}</span>
          </div>
          <!--:href="`https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&query=${acc.city}&search_type=filter_change&checkin=${this.moment(selectedCountry.startDate).format('YYYY-MM-DD')}&checkout=${this.moment(selectedCountry.startDate).add(acc.days, 'd').format('YYYY-MM-DD')}&adults=1&room_types%5B%5D=Private%20room&room_types%5B%5D=Shared%20room&s_tag=8DWMm8pZ`"-->

          <a
            :href="accommodationLink(acc.city, acc.days)"
            target="_blank"
            rel="noreferrer noopener"
          >
            <BaseButton
              filled
              icon="arrow-right"
              iconRight
            >
              Search
            </BaseButton>
          </a>
        </div>
        <hr class="divider">
      </div>
    </div>
  </div>
</template>

<script>
  import BaseButton from '@/components/BaseButton'

  export default {
    name: 'accommodation-list',
    components: {
      BaseButton
    },
    props: {
      accommodation: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      accommodationLink(city, days) {
        return `https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&query=${city}&search_type=filter_change&checkin=${this.moment().add(50, 'days').format('YYYY-MM-DD')}&checkout=${this.moment().add(50 + Number(days), 'days').format('YYYY-MM-DD')}&adults=1&room_types%5B%5D=Private%20room&room_types%5B%5D=Shared%20room&s_tag=8DWMm8pZ`
      }
    },
  }
</script>

<style scoped lang="scss">
  .accommodation {
    overflow-y: auto;
    height: 80%;

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
</style>
