<template>
  <app-table-collapse header="Resultado da pesquisa" :loading="loading" :result="result" @page-change="onPageChange" @refresh="onRefresh" :refreshable="false">
    <div class="alert alert-secondary border-0 rounded-0">
      <small>Clique sobre a linha do registro para detalhá-lo.</small>
    </div>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th class="number-column">#</th>
          <th class="text-center">Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in result.page.data" :key="task.id">
          <td class="text-center">
            {{ result.position(index) }}
          </td>
          <td class="text-center">
            <router-link :to="toTaskDetail(task)" class="text-dark">{{ task.title | title }}</router-link>
          </td>
          <td>
            <router-link :to="toTaskDetail(task)" class="text-dark">{{ task.status }}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </app-table-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Location } from 'vue-router';

import { ResultList, Task } from '@/models';

@Component
export default class TaskTable extends Vue {
  @Prop({ default: () => new ResultList<Task>() }) private result!: ResultList<Task>;
  @Prop({ default: false }) private loading!: boolean;

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  private onRefresh(pageNumber: number): void {
    this.$emit('refresh', pageNumber);
  }

  private onDetail(model: Task): void {
    this.$emit('detail', model);
  }

  private toTaskDetail(model: Task): Location {
    return { name: 'TaskDetail', params: { id: '' + model.id } };
  }
}
</script>
