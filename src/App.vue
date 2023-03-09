<script>
import { useUserStore } from './stores/user'
import { USER } from './constants'
import LayoutPage from './components/Layout.vue'
export default {
  components: {
    LayoutPage
  },
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem(USER))
    this.userStore.setUser(user)
  }
}
</script>

<template>
  <div v-if="userStore.user">
    <LayoutPage />
  </div>
  <router-view v-else></router-view>
</template>
