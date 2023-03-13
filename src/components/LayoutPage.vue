<script setup>
import { useUserStore } from '../stores/user'
import SideBar from './SideBar.vue'
import { logout } from '../services';
import { ref } from 'vue';

const drawer = ref(false)
const userStore = useUserStore()

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" density="compact">
        <v-app-bar-nav-icon icon="mdi-menu" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <v-app-bar-title>App</v-app-bar-title>
        <p>{{ userStore?.user?.name }}</p>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item key="changePassword">
              <v-list-item-title>Change password</v-list-item-title>
            </v-list-item>
            <v-list-item key="logout" @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer">
        <SideBar />
      </v-navigation-drawer>
      <v-main class="w-100"><router-view></router-view></v-main>
      <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">Footer</v-footer>
    </v-layout>
  </v-card>
</template>
