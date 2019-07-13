<template>
  <div>
    <h2 class="heading heading--section">
      Flights
    </h2>

    <div class="flights">
      <div
        v-for="flight in flights"
        :key="`${flight.from}-${flight.to}`"
      >
        <div class="flights-item">
          <div>
            <span class="copy--bold flights-item-from-to">
              {{ flight.from }} to {{ flight.to }}
            </span>
            <span> / </span>
            <span>
              {{ flight.priceMin }} - {{ flight.priceMax }}
            </span>
          </div>
          <a
            :href="flightLink(flight.fromCode, flight.toCode)"
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
    name: 'flight-list',
    components: {
      BaseButton
    },
    props: {
      flights: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      flightLink(fromCode, toCode) {
        return `https://www.google.com/flights?hl=pl#flt=${fromCode}.${toCode}.${this.moment().add(50, 'days').format('YYYY-MM-DD')};c:PLN;e:1;sd:1;t:f;tt:o`
      }
    }
  }
</script>

<style scoped lang="scss">
  .flights {
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

  .flights-item-from-to {
    display: inline-block;
  }
</style>
