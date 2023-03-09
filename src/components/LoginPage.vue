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
      loading: false,
      usernameRules: [
        value => {
          if (value) return true

          return 'You must enter username.'
        },
      ],
      passwordRules: [
        value => {
          if (value) return true

          return 'You must enter password.'
        },
      ],
    }
  },
  methods: {
    async login() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.loading = true
        userService.login(this.username, this.password).then((user) => {
          this.$router.push('/')
          this.userStore.setUser(user)
          this.loading = false
        })
      }
    },
  },
}
</script>
<template>
  <div class="h-screen d-flex justify-center align-center w-100" style="position: absolute;">
    <v-sheet v-if="!loading && !userStore.user" width="300" class="mx-auto my-auto">
      <v-form ref="form" @submit.prevent="login">
        <div class="text-h4 mb-3">Login</div>
        <v-text-field v-model="username" :rules="usernameRules" label="Username"></v-text-field>
        <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password"></v-text-field>
        <v-btn type="submit" block class="mt-2">Login</v-btn>
      </v-form>
    </v-sheet>
    <v-progress-circular v-else indeterminate color="teal"></v-progress-circular>
  </div>
</template>
