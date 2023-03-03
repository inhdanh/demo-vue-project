<script setup>
import { reactive, computed } from 'vue';

const data = reactive({ username: '', password: '' })

const login = () => {
    console.log(formValid.value)
    if (formValid.value)
        console.log(data)
}
const userNameValid = computed(() => data.username.trim().length > 0)
const passwordValid = computed(() => data.password.trim().length > 0)
const formValid = computed(() => userNameValid && passwordValid)

</script>
<template>
    <h1>Login</h1>
    <form @submit.prevent="login">
        <label>Username:
            <input v-model="data.username" type="text" />
            <div v-if="!userNameValid">Please enter username</div>
        </label>
        <br />
        <label>Password:
            <input v-model="data.password" type="password" />
            <div v-if="!passwordValid">Please enter password</div>
        </label>
        <button type="submit" :disabled="!formValid">Login</button>
    </form>
</template>