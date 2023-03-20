<script setup>
import { ref, watchEffect } from 'vue'

const todos = ref(JSON.parse(localStorage.getItem('todos')))
const todoInput = ref()
const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}
const filter = ref('all')

const handleSave = () => {
  const newTodo = {
    id: uuidv4(),
    title: todoInput.value,
    completed: false
  }
  todos.value.push(newTodo)
  todoInput.value = ''
}
watchEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
})
const filters = {
  all: () => todos.value,
  active: () => todos.value.filter((item) => !item.completed),
  completed: () => todos.value.filter((item) => item.completed)
}
</script>
<template>
  <h1>todo</h1>
  <input class="input-todo" v-model="todoInput" />
  <button @click="handleSave">Save</button>
  <div v-for="todo in filters[filter]()" :key="todo.id">
    <input type="checkbox" :id="todo.id" v-model="todos.find((i) => i.id === todo.id).completed" />
    <label :for="todo.id">{{ todo.title }}</label>
  </div>
  <div>
    Remain: {{ filters.active().length }}
    <div>
      <input type="radio" id="all" v-model="filter" value="all" />
      <label for="all">All</label>
    </div>
    <div>
      <input type="radio" id="active" v-model="filter" value="active" />
      <label for="active">Active</label>
    </div>
    <div>
      <input type="radio" id="completed" v-model="filter" value="completed" />
      <label for="completed">Completed</label>
    </div>
  </div>
</template>
<style module>
.input-todo {
  border: 1px solid gray;
}
</style>
