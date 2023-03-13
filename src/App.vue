<script setup>
import { useUserStore } from './stores/user'
import { USER } from './constants'
import LayoutPage from './components/LayoutPage.vue'
import { onMounted } from 'vue'

const userStore = useUserStore()
onMounted(() => {
  const user = JSON.parse(localStorage.getItem(USER))
  userStore.setUser(user)
})
</script>

<template>
  <div v-if="userStore.user">
    <LayoutPage />
  </div>
  <router-view v-else></router-view>
</template>
