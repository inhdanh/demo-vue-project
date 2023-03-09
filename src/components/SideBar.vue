<script>
export default {
  name: 'SideBar',
  data() {
    return {
      menu: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Purchase Order', path: '/purchase-order' },
        { name: 'Payment Request', path: '/payment-request' },
        { name: 'Setting', path: '/setting' }
      ]
    }
  }
}
</script>
<template>
  <ul>
    <li
      :key="menuItem.path"
      v-for="menuItem in menu"
      :class="{ active: menuItem.path === $router.currentRoute.value.path }"
    >
      <router-link :to="menuItem.path">{{ menuItem.name }}</router-link>
    </li>
  </ul>
</template>

<style scoped>
.active {
  font-weight: bold;
}
</style>
