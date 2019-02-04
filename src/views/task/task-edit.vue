<template>
  <div id="task-edit">
    <div class="row">
      <div class="col-sm-8">
        <task-form id="task-form" :model="model" @cancel="onCancel" @save="onUpdate"></task-form>
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
      name: 'TasksList',
    });
  }

  public onUpdate(model: Task): void {
    const a = this.$store.dispatch('tasks/update', { model });
    console.log(a);
  }

}
</script>
