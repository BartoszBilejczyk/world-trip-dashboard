<template>
  <div class="weather">
    <div class="weather-header">
      <h2 class="heading heading--section">Weather</h2>
      <div>
       <span
         v-for="city in cities.split(', ')"
         class="city"
         :class="{'city--active': city === activeCity}"
         @click="getCurrentWeather(city)"
       >
         {{ city }}
        </span>
      </div>
    </div>
    <Loader
      :loading="loading"
      :component="true"
    >
      <ul class="weather-data" v-if="weatherData && weatherData.city && weatherData.list">
        <h2 class="heading heading--subsection">Current weather in {{ weatherData.city.name }}</h2>
        <li class="weather-data__days">
          <div
            class="weather-data__item"
            v-for="(weather, index) in weatherData.list.slice(0,5)"
            :key="index"
          >
            <div>{{ moment().add(index, 'days').format('DD, MMM') }}</div>
            <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt="Weather icon">
            <div class="temperature">
              {{ weather.temp.day.toFixed() }}<span class="celsius"> &#8451;</span>
            </div>
            <!--<span class="day">{{ moment(week[index]).format('ddd') }}</span>-->
            <img class="weather-type" src="" alt="">
          </div>
        </li>
      </ul>
    </Loader>
  </div>
</template>

<script>
  import axios from 'axios';

  import Loader from '@/components/Loader';

  export default {
    name: 'weather',
    props: {
      cities: {
        type: String,
        default: () => ''
      }
    },
    components: {
      Loader
    },
    data() {
      return {
        weatherData: [],
        activeCity: '',
        loading: false
      }
    },
    methods: {
      async getCurrentWeather(city) {
        console.log(city)
        this.loading = true;
        this.activeCity = city;

        await axios
          .get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&APPID=0741e0fc29ec393451e350d27c1db6d6`)
          .then(response => (this.weatherData = response.data));

        this.loading = false;
      }
    },
    mounted() {
      if (this.cities) {
        this.getCurrentWeather(this.cities.split(', ')[0]);
      }
    },
    // updated() {
    //   if (this.cities && this.activeCity !== this.cities.split(', ')[0]) {
    //     this.weatherData = [];
    //
    //     this.getCurrentWeather(this.cities.split(', ')[0]);
    //   }
    // }
  }
</script>

<style lang="scss">
  .weather {
    .loader-wrapper {
      max-height: 80%;
    }
  }
</style>

<style scoped lang="scss">
  .weather {
    height: 100%;
    position: relative;
  }

  .city {
    cursor: pointer;
    margin-right: $ui-default-measure;

    &--active {
      @include font-weight(700);
    }
  }

  .weather-data {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include font(14, 600);

    &__days {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: $ui-default-measure2x;
      width: 100%;
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;

      > * {
        margin-bottom: $ui-default-measure;
      }

      img {
        max-width: 45px;
      }
    }
  }

  .temperature {
    @include font(22, 600);
    display: flex;
    align-items: flex-start;

    .celsius {
      @include font(13)
    }
  }
</style>
