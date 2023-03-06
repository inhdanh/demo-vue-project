<script>
import { userService } from '../services/user.service'
import { useUserStore } from '../stores/user'

export default {
  name: 'LoginPage',
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      userService.login(this.username, this.password).then((user) => {
        this.$router.push('/')
        this.userStore.setUser(user)
      })
    }
  },
  computed: {
    isUsernameValid() {
      return this.username.trim().length > 0
    },
    isPasswordValid() {
      return this.password.trim().length > 0
    },
    formValid() {
      return this.isPasswordValid && this.isUsernameValid
    }
  }
}
</script>
<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <label>Username:
      <input v-model="username" type="text" />
      <div v-if="!isUsernameValid">Please enter username</div>
    </label>
    <br />
    <label>Password:
      <input v-model="password" type="password" />
      <div v-if="!isPasswordValid">Please enter password</div>
    </label>
    <button type="submit" :disabled="!formValid">Login</button>
  </form>
</template>
