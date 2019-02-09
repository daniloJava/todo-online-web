<template>
  <div id="task-list">
    <task-filter id="task-filter" :filter="filter" @reset="onReset" @search="onSearch" @create="onCreate" :loading="loading"></task-filter>
    
    <task-table id="task-table" :result="taks" :loading="loading" :pageable="pageable" @page-change="onPageChanged" @edit="onEdit" @refresh="onRefresh" @delete="onDelete" ></task-table>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Model, Vue } from 'vue-property-decorator';
import { Observable, Subscription } from 'rxjs';
import { Notification } from 'element-ui';

import { Task, FilterTask, Page, ResultList, Pageable } from '@/models';
import { TaskService } from '@/services';
import TaskFilter from '@/views/task/shared/task-filter.vue';
import TaskTable from '@/views/task/shared/task-table.vue';

@Component({
  components: {
    TaskFilter,
    TaskTable,
  },
})
export default class TaskList extends Vue {
  private filter = new FilterTask();

  private page: Page<any> = new Page();
  private pageable: Pageable = new Pageable(1, 10);

  protected mounted(): void {
    _.assign(this.filter, this.$store.getters['tasks/filter']);
  }

  private onReset(): void {
    const self = this;

    self.$store.dispatch('tasks/clear').then(() => {
      self.filter = new FilterTask();
    });
  }

  private onSearch(): void {
    this.dispatchTasks(this.filter, new Pageable());
  }

  private onRefresh(pageNumber: number): void {
    this.dispatchTasks(this.filter, new Pageable(pageNumber));
  }

  private onPageChanged(pageNumber: number): void {
    this.dispatchTasks(this.filter, new Pageable(pageNumber));
  }

  private onEdit(model: Task): void {
    this.$router.push({ name: 'TasksEdit', params: { id: '' + model.id } });
  }

  private onCreate(model: Task): void {
    this.$router.push({ name: 'TasksCreate' });
  }

  private onDelete(model: Task): void {
    this.$confirm(`This will permanently delete the task "${model.title.toUpperCase()}". Continue?`, 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }).then(() => {
      new TaskService().delete(model.id).toPromise()
        .then(() => {
          Notification.success({
            title: 'Deleted',
            message: `Delete completed ${model.title}.`,
          });
          this.onSearch();
        });
    }).catch(() => {
      Notification.info({
        title: 'Deleted',
        message: 'Delete canceled.',
      });
    });
  }

  private get loading(): boolean {
    return this.$store.getters['tasks/loading'];
  }

  private get taks(): ResultList<Task> {
    return this.$store.getters['tasks/resultList'];
  }

  private dispatchTasks(filter: FilterTask, pageable: Pageable): void {
    this.$store.dispatch('tasks/query', { filter, pageable });
  }
}
</script>
