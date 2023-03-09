<script>
import { useUserStore } from '../stores/user'

export default {
  name: 'HomePage',
  setup() {
    const userStore = useUserStore()
    return { userStore }
  }
}
</script>
<template>
  <p>home page</p>
</template>

<style scoped></style>
