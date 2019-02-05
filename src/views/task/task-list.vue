<template>
  <div id="task-list">
    <app-page-header title="Tasks" subtitle="List"></app-page-header>

    <task-filter id="task-filter" :filter="filter" @reset="onReset" @search="onSearch" @create="onCreate" :loading="loading"></task-filter>
    
    <task-table id="task-table" :result="taks" :loading="loading" :pageable="pageable" @page-change="onPageChanged" @edit="onEdit" @view="onView" @refresh="onRefresh" @detail="onDetail"></task-table>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Model, Vue } from 'vue-property-decorator';
import { Observable, Subscription } from 'rxjs';

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

  private onDetail(model: Task): void {
    this.$router.push({ name: 'TaskDetail', params: { id: '' + model.id } });
  }

  private onEdit(model: Task): void {
    this.$router.push({ name: 'TaskEdit', params: { id: '' + model.id } });
  }

  private onCreate(model: Task): void {
    this.$router.push({ name: 'TasksCreate' });
  }

  private onView(model: Task): void {
    this.$router.push({ name: 'TaskDetail', params: { id: '' + model.id } });
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
