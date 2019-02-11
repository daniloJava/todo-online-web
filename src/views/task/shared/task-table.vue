<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="result.page.data" element-loading-text="Loading" border fit highlight-current-row :empty-text="emptyText" >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope"> {{ scope.$index + 1 }} </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope"> 
          <router-link :to="toTaskDetail(scope.row)" class="text-dark">{{ scope.row.title | startCase }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="Description">
        <template slot-scope="scope"> 
          <router-link :to="toTaskDetail(scope.row)" class="text-dark">{{ scope.row.description | startCase }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="Crate date">
        <template slot-scope="scope"> 
          <router-link :to="toTaskDetail(scope.row)" class="text-dark">{{ scope.row.dateCreate | formatDateTime }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="User update">
        <template slot-scope="scope"> 
          <router-link :to="toTaskDetail(scope.row)" class="text-dark">{{ scope.row.createdBy.username | startCase }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="Group">
        <template slot-scope="scope"> 
          <router-link :to="toTaskDetail(scope.row)" class="text-dark">{{ !scope.row.group || scope.row.group.name | startCase }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="Status">
        <template slot-scope="scope"> 
          <router-link :to="toTaskDetail(scope.row)" class="text-dark">{{ scope.row.status | startCase }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="Actions" >
        <template slot-scope="scope"> 
          <el-button type="danger" @click="toTaskDelete(scope.row)" size="mini" circle><i class="el-icon-delete"></i></el-button>
          <el-button type="primary" @click="onEdit(scope.row)" size="mini" circle><i class="el-icon-edit"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration">{{ total }}</span>
      <el-pagination
        @size-change="onPageChange"
        @current-change="onPageChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="result.page.count">
      </el-pagination>
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
