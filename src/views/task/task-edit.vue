<template>
  <div id="task-edit">
    <div class="conteiner">
      <div class="row">
        <task-form id="task-edit" :groups="groups" :model="model" @cancel="onCancel" @save="onUpdate" @group-autocomplete="onAutocomplete" @group-autocomplete-select="onAutocompleteComplete"></task-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observable, Subscription } from 'rxjs';

import { Task, GroupTask, Pageable, FilterTask } from '@/models';
import { TaskService, GroupTaskService } from '@/services';
import TaskForm from '@/views/task/shared/task-form.vue';

@Component({
  components: {
    TaskForm,
  },
})
export default class TaskEdit extends Vue {

  private model: Task = new Task();
  private groups: GroupTask[] = [];

  public onCancel(model: Task): void {
    this.$router.push({ name: 'TasksList' });
  }

  public onUpdate(model: Task): void {
    this.$store.dispatch('tasks/updateOrUpdate', { model });
    this.$router.push({ name: 'TasksList' });
  }

  protected mounted(): void {
    if (this.$route.params.id) {
      TaskService.findById(parseInt(this.$route.params.id, 10)).toPromise()
        .then((task: Task) => {
          this.model = task;
        });
    }
  }

  private onAutocomplete(queryString: string, callback: (results: GroupTask[]) => void): void {
    // tslint:disable-next-line:max-line-length
    new GroupTaskService().listBy({ q: queryString }).toPromise()
      .then((groups: GroupTask[]) => {
        callback(groups);
      });
  }

  private onAutocompleteComplete(group: GroupTask): void {
    this.model.group = group;
  }

}
</script>
