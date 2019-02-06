<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <task-list></task-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TaskList from './task/shared/task-list.vue';

@Component({
  components: {
    TaskList,
  },
})
export default class Home extends Vue {}
</script>
