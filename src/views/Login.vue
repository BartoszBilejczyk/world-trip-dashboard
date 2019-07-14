<template>
  <div class="login">
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
      filled
      @click="login"
    >
      Log in
    </BaseButton>
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
      }
    },
    methods: {
      async login() {
        await firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push('/')
          })
          .catch((e) => {
            console.log(e.code, e.message)
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    width: 400px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
