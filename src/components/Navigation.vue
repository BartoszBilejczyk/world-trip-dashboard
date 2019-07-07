<template>
  <div class="navigation">
    <router-link to="/">
      <img src="@/assets/logo.png" alt="logo" class="logo">
    </router-link>
    <router-link to="/calendar">
      Calendar
    </router-link>
    <router-link to="/country">
      Country details
    </router-link>
    <router-link to="/budget">
      Budget
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Menu'
  }
</script>

<style scoped lang="scss">
  .navigation {
    width: 100px;
    padding: 40px 0;
    background: $primary;
    box-shadow: 0px 0px 10px 10px rgba(0,0,0,0.1);
    z-index: 20;
  }
  
  .logo {
    max-width: 100px;
    height: auto;
  }
</style>
