<template>
  <div class="navigation">
    <router-link to="/">
      <img src="@/assets/logo.png" alt="logo" class="logo">
    </router-link>
    <router-link to="/calendar" class="navigation__link">
      <AIcon type="calendar" class="navigation__link-icon" />
      <span>
        Calendar
      </span>
    </router-link>
    <router-link to="/country" class="navigation__link">
      <AIcon type="global" class="navigation__link-icon" />
      <span>
        Country details
      </span>
    </router-link>
    <router-link to="/budget" class="navigation__link">
      <AIcon type="dollar" class="navigation__link-icon" />
      <span>
        Budget
      </span>
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

    &__link {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: 40px;
      color: $white;

      &-icon {
        font-size: 25px;
        margin-bottom: 4px;
      }
    }
  }
  
  .logo {
    max-width: 100px;
    height: auto;
  }

  .router-link-active {
    span {
      @include font-weight(700);
    }
  }
</style>
