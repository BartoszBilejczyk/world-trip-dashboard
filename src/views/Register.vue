<template>
  <div class="register">
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
      filled
      @click="register"
    >
      Register
    </BaseButton>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'

  import BaseButton from '@/components/BaseButton'

  export default {
    name: 'register',
    components: { BaseButton },
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async register() {
        await firebase.auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((e) => {
            console.log(e)
          })
          .catch((e) => {
            console.log(e.code, e.message)
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  .register {
    width: 400px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
