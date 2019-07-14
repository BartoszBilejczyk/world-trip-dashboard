<template>
  <div class="login">
    <h2 class="heading heading--section">Log in</h2>

    <div class="login-content">
      <AInput
        v-model="email"
        placeholder="Login"
      />
      <AInput
        v-model="password"
        placeholder="Password"
        type="password"
      />
      <BaseButton
        :loading="loading"
        filled
        @click="login"
      >
        Log in
      </BaseButton>

      <router-link to="/register">Don't have an account? Register.</router-link>
    </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'

  import BaseButton from '@/components/BaseButton'

  export default {
    name: 'login',
    components: { BaseButton },
    data() {
      return {
        email: '',
        password: '',
        loading: false
      }
    },
    methods: {
      async login() {
        this.loading = true;
        await firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push('/')
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
  .login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      margin-bottom: $ui-default-measure3x;
    }

    &-content {
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      > * {
        margin-bottom: $ui-default-measure2x
      }

      a {
        text-align: center;
        @include font(14, 600);

        &:hover {
          color: $text;
        }
      }
    }
  }
</style>
