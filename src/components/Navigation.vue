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
      class="navigation__logout"
      v-if="$store.state.user.email"
      @click="logout"
      onDarkBg
      :loading="loading"
      full
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
    data() {
      return {
        loading: false
      }
    },
    methods: {
      ...mapMutations(['setCurrentUser']),

      async logout() {
        this.loading = true;
        await firebase.auth().signOut()
          .then(() => {
            this.setCurrentUser({ isAdmin: false });
            this.$router.push('/login')
          })
          .catch((e) => {
            console.log(e.code, e.message)
          });
        this.loading = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 99;
    background: $primary;
    box-shadow: 0 0 10px 10px rgba(0,0,0,0.1);
    width: 100vw;

    &-content {
      display: flex;
      align-items: center;
    }

    &__link {
      padding: 10px;
      margin: 0 10px;
      color: $white;

      span {
        display: none;
      }
    }

    &__logout {
      display: none;
    }

    @include sm-up {
      position: static;
      width: 100px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      z-index: 99;
      padding: 0 10px 40px;

      &-content {
        padding: 40px 0;
        display: block;
      }

      &__link {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-top: 40px;

        span {
          display: inline;
        }

        &-icon {
          font-size: 25px;
          margin-bottom: 4px;
        }
      }

      &__logout {
        display: block;
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
