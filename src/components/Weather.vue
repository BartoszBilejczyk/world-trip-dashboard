<template>
  <div class="weather">
    <div class="weather-header">
      <h2 class="heading heading--section">Weather</h2>
      <div>
      <span v-for="city in cities.split(', ')">
       <span
         class="city"
         :class="{'city--active': city === activeCity}"
         @click="getCurrentWeather(city)"
       >
         {{ city }}
       </span>
      </span>
      </div>
    </div>
    <ul class="weather-data" v-if="weatherData && weatherData.city && weatherData.list">
      <h2 class="heading heading--section">Current weather in {{ weatherData.city.name }}, {{ weatherData.city.country }}</h2>
      <div class="weather-data__days">
        <li
          class="weather-data__item"
          v-for="(weather, index) in weatherData.list"
          :key="index"
        >
          <div>{{ moment().add(index, 'days').format('DD, MMM') }}</div>
          <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt="Weather icon">
          <div class="temperature">
            {{ weather.temp.day.toFixed() }}<span class="celsius"> &#8451;</span>
          </div>
          <!--<span class="day">{{ moment(week[index]).format('ddd') }}</span>-->
          <img class="weather-type" src="" alt="">
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'weather',
    props: {
      cities: {
        type: String,
        default: () => ''
      }
    },
    data() {
      return {
        weatherData: [],
        activeCity: ''
      }
    },
    methods: {
      async getCurrentWeather(city) {
        this.activeCity = city;

        await axios
          .get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&APPID=0741e0fc29ec393451e350d27c1db6d6`)
          .then(response => (this.weatherData = response.data))
      },
    }
  }
</script>

<style scoped lang="scss">
  .weather {
    height: 100%;
  }

  .weather-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .city {
    cursor: pointer;
    margin-left: 10px;

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
