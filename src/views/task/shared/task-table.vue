<template>
  <div>
    <div class="alert alert-secondary border-0 rounded-0">
      <small>Clique sobre a linha do registro para detalhá-lo.</small>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th class="number-column">#</th>
            <th class="text-center">Title</th>
            <th>Description</th>
            <th>Crate date</th>
            <th>Crate update</th>
            <th>Group</th>
            <th>Status</th>
            <th>Acões</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in result.page.data" :key="task.id">
            <td class="text-center">
              {{ result.position(index) }}
            </td>
            <td class="text-center">
              <router-link :to="toTaskDetail(task)" class="text-dark">{{ task.title | startCase }}</router-link>
            </td>
            <td>
              <router-link :to="toTaskDetail(task)" class="text-dark">{{ task.description | startCase }}</router-link>
            </td>
            <td>
              <router-link :to="toTaskDetail(task)" class="text-dark">{{ task.dateCreate | formatDateTime }}</router-link>
            </td>
            <td>
              <router-link :to="toTaskDetail(task)" class="text-dark">{{ task.dateUpdate | formatDateTime }}</router-link>
            </td>
            <td>
              <router-link :to="toTaskDetail(task)" class="text-dark">{{ task.group.name | startCase }}</router-link>
            </td>
            <td>
              <router-link :to="toTaskDetail(task)" class="text-dark">{{ task.status | startCase }}</router-link>
            </td>
            <td>
              <el-button type="danger" @click="toTaskDelete(task)"><i class="el-icon-delete"></i></el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer text-center" v-if="result.isEmpty()">
      <i class="icon-folder-search icon-2x text-muted mb-1"></i>
      <div class="card-title text-muted mb-0">{{ emptyText }}</div>
    </div>
    <div slot="footer"  v-else>
      <div class="row">
        <div class="col-sm">
            <span class="b-pagination-line">{{ total }}</span>
        </div>
        <div class="col-sm">
          <b-pagination size="md" :total-rows="result.page.count" v-model="currentPage" :per-page="result.pageable.pageSize" @change="onPageChange"></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Location } from 'vue-router';
import { Notification } from 'element-ui';
import { ResultList, Task } from '@/models';
import { TaskService } from '@/services';

@Component
export default class TaskTable extends Vue {
  @Prop({ default: () => new ResultList<Task>() }) private result!: ResultList<Task>;
  @Prop({ default: false }) private loading!: boolean;
  @Prop({ default: 'Total de {total} registros' }) private totalText!: string;
  @Prop({ default: 'Nenhum registro para exibir.' }) private emptyText!: string;

  private currentPage: number;

  constructor() {
    super();
    this.currentPage = this.result.pageable.pageNumber;
  }

  private get total(): string {
    const text = this.result.page.count > 500 ? 'Aproximadamente {total} resultados' : this.totalText;
    return text.replace('{total}', String(this.result.page.count.toLocaleString('pt-BR')));
  }

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
    return { name: 'TasksDetail', params: { id: '' + model.id } };
  }

  private toTaskDelete(model: Task): void {
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
        });
    }).catch(() => {
      Notification.info({
        title: 'Deleted',
        message: 'Delete canceled.',
      });
    });
  }

  @Watch('result', { immediate: false, deep: true })
  private onResultChanged(value: ResultList<any>, oldValue: ResultList<any>): void {
    this.currentPage = this.result.pageable.pageNumber;
  }

}
</script>
