<script>
import { useUserStore } from '../stores/user'
import SideBar from '../components/SideBar.vue'
export default {
  name: 'LayoutPage',
  components: {
    SideBar
  },
  setup() {
    const userStore = useUserStore()
    return { userStore }
  }
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" density="compact">
        <v-app-bar-nav-icon icon="mdi-menu"></v-app-bar-nav-icon>
        <v-app-bar-title>App</v-app-bar-title>
        <p>{{ userStore?.user?.name }}</p>
      </v-app-bar>
      <div class="main-wrapper">
        <aside class="side-bar">
          <SideBar />
        </aside>
        <v-main class="main"><router-view></router-view></v-main>
      </div>
      <footer class="footer">footer</footer>
    </v-layout>
  </v-card>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  height: 100px;
  padding: 0 10px;
}

.main-wrapper {
  display: flex;
  min-height: calc(100vh - 100px);
}

.side-bar {
  border: 1px solid gray;
  flex: 1;
}

.main {
  border: 1px solid gray;
  flex: 3;
}

.footer {
  border: 1px solid gray;
}
</style>
