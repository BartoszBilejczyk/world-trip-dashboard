<template lang="html">
  <div class="country-list-wrapper">
    <div class="container">
      <div class="continents">
        <div class="continents-images">
          <div v-for="continent in continents" :key="continent" class="continent" :class="{ 'active': activeContinent === continent}" @click="activeContinent = continent">
            <img :src="require(`../assets/${continent}.svg`)" class="continent-image img-responsive">
            <span class="continent-name">{{ continent }}</span>
          </div>
        </div>
      </div>
      <ul class="country-list">
        <li class="country-name" :class="{ 'active': activeContinent === country.continent || activeContinent === 'World' }" v-for="country in countries" :key="country.name">
          <div @click="setCountry(country.name)">
            <AIcon type="global" /> {{ country.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { CONTINENTS } from '../constants/index';
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'country-list',
    data() {
      return {
        continents: CONTINENTS,
        activeContinent: 'World'
      }
    },
    computed: {
      ...mapState(['countries']),
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
  .country-list-wrapper {
    background: $gray;
    flex: 1;
  }

  .continents-images {
    display: flex;
    justify-content: space-around;
    padding-bottom: 35px;
    flex-wrap: wrap;
  }
  
  .continent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    cursor: pointer;

    &.active .continent-name {
      color: $primary;
      @include font-weight(700);
    }

    &.active .continent-image {
      filter: contrast(1);
    }

    &-name {
      @include font(20);
      color: lighten($primary, 20%);
    }
  }
  
  .continent-image {
    filter: contrast(0);
    max-height: 100px;
    margin-bottom: 30px;
    transition: 0.4s ease;
  }
  
  .continent-names {
    width: 100%;

    span {
      display: block;
    }
  }
  
  .country {
    &-list {
      flex-wrap: wrap;
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
    }
    &-name {
      position: relative;
      text-align: left;
      width: 14%;
      min-width: 150px;
      @include font(18, 300);
      margin: 15px 10px;
      color: lighten($primary, 20%);
      cursor: pointer;
      transition: 0.4s ease;

      &.active {
        color: $primary;
        @include font-weight(700);

        span {
          border-bottom: 1px solid $primary;
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
  }
</style>
