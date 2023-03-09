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
      password: '',
      loading: false
    }
  },
  methods: {
    login() {
      this.loading = true
      userService.login(this.username, this.password).then((user) => {
        this.$router.push('/')
        this.userStore.setUser(user)
        this.loading = false
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
  <form v-if="!loading && !userStore.user" @submit.prevent="login">
    <label
      >Username:
      <input v-model="username" type="text" />
      <div v-if="!isUsernameValid">Please enter username</div>
    </label>
    <br />
    <label
      >Password:
      <input v-model="password" type="password" />
      <div v-if="!isPasswordValid">Please enter password</div>
    </label>
    <button type="submit" :disabled="!formValid">Login</button>
  </form>
  <div v-else>Loading...</div>
</template>
