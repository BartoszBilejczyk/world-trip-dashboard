<template lang="html">
  <div class="country-list-wrapper">
    <div v-if="!loading">
      <div class="country-list__continent-images">
        <div
          v-for="continent in continents"
          :key="continent"
          class="country-list__continent"
          :class="{ 'active': activeContinent === continent}"
          @click="activeContinent = continent"
        >
          <img
            :src="require(`../assets/${continent}.svg`)"
            class="country-list__continent-image img-responsive"
          >
          <span
            class="country-list__continent-name">
            {{ continent }}
          </span>
        </div>
      </div>
    </div>
    <ul class="country-list">
      <li
        class="country-list__name"
        :class="{ 'active': activeContinent === country.continent || activeContinent === 'World' }"
        v-for="country in countries"
        :key="country.name"
      >
        <div @click="setCountry(country.name)">
          <AIcon type="global" /> {{ country.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  import Loader from '@/components/Loader'

  import { CONTINENTS } from '../constants/index';

  export default {
    name: 'country-list',
    components: { Loader },
    data() {
      return {
        continents: CONTINENTS,
        activeContinent: 'World'
      }
    },
    computed: {
      ...mapState(['countries', 'loading']),
    },
    methods: {
      ...mapMutations(['setActiveCountry']),

      setCountry(name) {
        const countryId = this.countries.find((c) => c.name === name).id;

        this.setActiveCountry(countryId);

        this.$router.push('/country');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .country-list {
    $module: &;

    flex-wrap: wrap;
    display: flex;
    justify-content: flex-end;
    margin-top: 70px;
    max-width: 1400px;

    &-wrapper {
      background: $gray;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    &__name {
      position: relative;
      text-align: left;
      width: 14%;
      min-width: 150px;
      @include font(18, 300);
      margin: 15px 10px;
      color: lighten($text, 30%);
      cursor: pointer;
      transition: 0.4s ease;

      &.active {
        color: $text;
        @include font-weight(700);

        span {
          border-bottom: 1px solid $text;
        }

        svg {
          transform: translateY(-50%) scale(1.2);
          transition: 0.3s ease;
        }
      }
      span {
        position: relative;
      }
      svg {
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &__continent {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 20px 30px;
      cursor: pointer;

      &.active #{$module}__continent-name {
        color: $text;
        @include font-weight(700);
      }

      &.active #{$module}__continent-image {
        filter: contrast(1);
        opacity: 1;
      }

      &-name {
        @include font(20);
        color: lighten($text, 30%);
      }

      &-images {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }

      &-image {
        filter: contrast(0);
        opacity: 0.7;
        max-height: 120px;
        margin-bottom: 30px;
        transition: 0.4s ease;
      }
    }
  }
</style>
