<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const open = ref([])

const menu = [
  { name: 'Dashboard', path: '/dashboard', icon: 'mdi-chart-bar' },
  { name: 'Purchase Order', path: '/purchase-order', icon: 'mdi-cart' },
  { name: 'Payment Request', path: '/payment-request', icon: 'mdi-credit-card' },
]

const menuSettings = [
  { name: 'School', path: '/setting/school' },
  { name: 'Staff', path: '/setting/staff' },
  { name: 'Payment', path: '/setting/payment' },
]

const redirect = (path) => {
  router.push(path)
}

const isActive = computed(() => router.currentRoute.value.path.includes('/setting'))

watch(() => ref(router), (newRouter) => {
  const path = newRouter.value.currentRoute.path
  open.value[0] = path.includes('/setting') ? '/setting' : path

}, { deep: true })

</script>
<template>
  <v-list nav v-model:opened="open">
    <v-list-item :active="menuItem.path === $router.currentRoute.value.path" v-for="menuItem in menu" :key="menuItem.path"
      :prepend-icon="menuItem.icon" :title="menuItem.name" :value="menuItem.path" @click="redirect(menuItem.path)">
    </v-list-item>

    <v-list-group value="/setting">
      <template v-slot:activator="{ props }">
        <v-list-item :active="isActive" v-bind="props" title="Settings" prepend-icon="mdi-tools"></v-list-item>
      </template>

      <v-list-item :active="path === $router.currentRoute.value.path" v-for="({ name, path }) in menuSettings" :key="path"
        :value="path" :title="name" @click="redirect(path)"></v-list-item>
    </v-list-group>
  </v-list>
</template>
