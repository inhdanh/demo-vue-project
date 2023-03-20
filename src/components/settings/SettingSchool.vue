<script setup>
import { ref } from 'vue'

const tab = ref(null)
</script>
<template>
  <v-app>
    <v-card>
      <v-tabs v-model="tab">
        <v-tab value="costCenter">Cost Center</v-tab>
        <v-tab value="gradeClass">Grade Class</v-tab>
        <v-tab value="subject">Subject</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="costCenter"> Cost center </v-window-item>

          <v-window-item value="gradeClass"> Grade class </v-window-item>

          <v-window-item value="subject"> Subject </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-app>
</template>
