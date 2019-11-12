<template>
  <div id="app">
    <Navigation />
    <div class="main">
      <Loader :loading="loading">
        <router-view v-if="!loading" />
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
    display: flex;
    max-width: 100vw;

    @include sm-up {
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
    }
  }

  .main {
    min-height: calc(100vh - 100px);
    width: 100vw;
    flex: 1;
    display: flex;
    flex-direction: column;

    @include sm-up {
      min-height: 100vh;
      width: calc(100vw - 100px);
    }
  }
</style>
