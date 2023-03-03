<script setup>
import { reactive } from 'vue';

const data = reactive({ username: '', password: '' })
const login = () => {
    console.log(data)
}
</script>
<template>
    <h1>Login</h1>
    <form @submit.prevent="login">
        <label>Username:
            <input v-model="data.username" type="text" />
        </label>
        <label>Password:
            <input v-model="data.password" type="password" />
        </label>
        <button type="submit">Login</button>
    </form>
</template>