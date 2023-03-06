<script>
import { useUserStore } from './stores/user'
export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userStore.setUser(user)
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
