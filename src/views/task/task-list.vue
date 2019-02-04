<template>
  <div id="task-list">
    <app-page-header title="Tasks" subtitle="List"></app-page-header>

    <task-filter id="task-filter" :model="filter" @reset="onReset" @search="onSearch"></task-filter>

    <task-table id="task-table" :page="page" :pageable="pageable" @page-changed="onPageChanged" @edit="onEdit" @view="onView"></task-table>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Model, Vue } from 'vue-property-decorator';
import { Observable, Subscription } from 'rxjs';

import { Task, FilterTask, Page, Pageable } from '@/models';
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

  private onDetail(model: Task): void {
    this.$router.push({ name: 'TaskDetail', params: { id: '' + model.id } });
  }

  private onEdit(model: Task): void {
    this.$router.push({ name: 'TaskEdit', params: { id: '' + model.id } });
  }

  private onView(model: Task): void {
    this.$router.push({ name: 'TaskDetail', params: { id: '' + model.id } });
  }

  private get loading(): boolean {
    return this.$store.getters['tasks/loading'];
  }

  private dispatchTasks(filter: FilterTask, pageable: Pageable): void {
    this.$store.dispatch('tasks/query', { filter, pageable });
  }
}
</script>
