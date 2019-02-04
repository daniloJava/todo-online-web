<template>
  <div id="task-edit">
    <app-page-header title="Tasks" subtitle="Edit"></app-page-header>
    <div class="breadcrumb-line header-elements-md-inline" style="margin-top: -45px; margin-left: 6px;">
      <div class="d-flex">
        <div class="breadcrumb">
          <a href="index.html" class="breadcrumb-item"> Início</a>
          <a href="content_cards_content.html" class="breadcrumb-item">Tasks</a>
          <span class="breadcrumb-item active">Record XXX</span>
        </div>

        <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observable, Subscription } from 'rxjs';

import { Task } from '@/models';
import { TaskService } from '@/services';
import TaskForm from '@/views/task/shared/task-form.vue';

@Component({
  components: {
    TaskForm,
  },
})
export default class TaskEdit extends Vue {
  private model: Task = new Task();

  public onCancel(model: Task): void {
    this.$router.push({
      name: 'TaskList',
    });
  }

}
</script>
