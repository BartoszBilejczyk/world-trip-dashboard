<template>
  <div id="app">
    <Navigation />
    <div class="main">
      <Loader :loading="loading">
        <router-view/>
      </Loader>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import Navigation from '@/components/Navigation';
  import Loader from '@/components/Loader';

  export default {
    name: 'App',
    components: { Navigation, Loader },
    computed: {
      ...mapState(['loading'])
    },
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
