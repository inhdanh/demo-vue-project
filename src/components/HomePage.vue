<script>
import { useUserStore } from '../stores/user';

export default {
  name: 'HomePage',
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
}
</script>
<template>
  <h1>{{ userStore?.user?.name }}</h1>
</template>
