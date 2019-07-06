<template>
  <div id="app">
    <Navigation />
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation';
  import { db } from '@/db';
  import { mapActions } from 'vuex';

  export default {
    name: 'App',
    components: { Navigation },
    methods: {
      ...mapActions(['fetchCountries'])
    },

    mounted() {
      this.fetchCountries();
    }
  }
</script>

<style lang="scss">
  #app {
    overflow: hidden;
    height: 100vh;
    max-height: 100vh;
    display: flex;
  }

  .main {
    width: calc(100vw - 100px);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
