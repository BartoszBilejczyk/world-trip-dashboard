<template>
  <div id="app">
    <Navigation />
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'

  export default {
    name: 'App',
    components: { Navigation }
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
