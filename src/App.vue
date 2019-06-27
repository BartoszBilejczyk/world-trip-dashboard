<template>
  <div id="app">
    <div class="main">
      <router-view/>
    </div>
    <div class="drawer"></div>
  </div>
</template>

<style lang="scss">
  #app {
    overflow: hidden;
    height: 100vh;
    max-height: 100vh;
  }

  .main {
    width: calc(100vw - 300px);
  }

  .drawer {
    width: 300px;
    padding: 80px 40px;
  }
</style>
