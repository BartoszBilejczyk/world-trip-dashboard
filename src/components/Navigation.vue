<template>
  <div class="navigation">
    <div class="navigation-content">
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
    <BaseButton
      v-if="$store.state.user.email"
      @click="logout"
      onDarkBg
    >
      Log out
    </BaseButton>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'
  import { mapMutations } from 'vuex';

  import BaseButton from '@/components/BaseButton';

  export default {
    name: 'Menu',
    components: {
      BaseButton
    },
    methods: {
      ...mapMutations(['setCurrentUser']),

      async logout() {
        await firebase.auth().signOut()
          .then(() => {
            this.setCurrentUser({ isAdmin: false });
            this.$router.push('/login')
          })
          .catch((e) => {
            console.log(e.code, e.message)
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  .navigation {
    width: 100px;
    background: $primary;
    box-shadow: 0 0 10px 10px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: 20;
    padding-bottom: 40px;

    &-content {
      padding: 40px 0;
    }

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
