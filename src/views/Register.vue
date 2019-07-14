<template>
  <div class="register">
    <h2 class="heading heading--section">Register</h2>

    <div class="register-content">
      <AInput
        v-model="email"
        placeholder="Email"
      />
      <AInput
        v-model="password"
        placeholder="Password"
        type="password"
      />
      <BaseButton
        :loading="loading"
        filled
        full
        @click="register"
      >
        Register
      </BaseButton>
      <router-link to="/login">Back to login</router-link>
    </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'
  import { mapActions } from 'vuex';

  import BaseButton from '@/components/BaseButton'

  export default {
    name: 'register',
    components: { BaseButton },
    data() {
      return {
        email: '',
        password: '',
        loading: false
      }
    },
    methods: {
      ...mapActions(['addUser']),

      async register() {
        this.loading = true;
        await firebase.auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            this.addUser({data, email: this.email});
            this.$router.push('/login');
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
  .register {
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
