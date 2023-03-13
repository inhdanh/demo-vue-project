<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const menu = ref([
  { name: 'Dashboard', path: '/dashboard', icon: 'mdi-chart-bar' },
  { name: 'Purchase Order', path: '/purchase-order', icon: 'mdi-cart' },
  { name: 'Payment Request', path: '/payment-request', icon: 'mdi-credit-card' },
  { name: 'Setting', path: '/setting', icon: 'mdi-tools' }
])

const redirect = (path) => {
  router.push(path)
}

</script>
<template>
  <v-list nav>
    <v-list-item :active="menuItem.path === $router.currentRoute.value.path" v-for="menuItem in menu" :key="menuItem.path"
      :prepend-icon="menuItem.icon" :title="menuItem.name" :value="menuItem.path" @click="redirect(menuItem.path)">
    </v-list-item>
  </v-list>
</template>
