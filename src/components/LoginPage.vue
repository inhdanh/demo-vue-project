<script setup>
import { ref } from 'vue'
import { userService } from '../services/user.service'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { useFetch } from '../helpers'

const userStore = useUserStore()
const username = ref('')
const password = ref('')
const rules = (fieldName) => [(value) => (value ? true : `You must enter ${fieldName}`)]
const form = ref(null)
const router = useRouter()
const { loading, data, execute } = useFetch(() => userService.login(username.value, password.value))

const login = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    await execute()
    userStore.setUser(data.value)
    router.push('/')
  }
}
</script>
<template>
  <div class="h-screen d-flex justify-center align-center w-100" style="position: absolute">
    <v-sheet v-if="!loading && !userStore.user" width="300" class="mx-auto my-auto">
      <v-form ref="form" @submit.prevent="login">
        <div class="text-h4 mb-3">Login</div>
        <v-text-field v-model="username" :rules="rules('username')" label="Username"></v-text-field>
        <v-text-field
          v-model="password"
          :rules="rules('password')"
          label="Password"
          type="password"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Login</v-btn>
      </v-form>
    </v-sheet>
    <v-progress-circular v-else indeterminate color="teal"></v-progress-circular>
  </div>
</template>
