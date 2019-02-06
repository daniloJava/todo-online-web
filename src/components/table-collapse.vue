<template>
  <app-card icon="icon-table" :badgeable="!result.error && result.isNotEmpty()" :badge="result.page.count | numeric" :header="header" :collapsed="collapsed" :collapsible="collapsible" :refreshable="refreshable" @refresh="onRefresh" @collapse="onCollapse" bodyClass="p-0">
    <slot name="navbar"></slot>

    <div class="table-responsive" v-if="!result.error && result.isNotEmpty()">
      <slot></slot>
    </div>

    <div class="card-footer text-center" v-if="result.error">
      <i class="icon-folder-search icon-2x text-danger mb-1"></i>
      <div class="card-title text-danger mb-0">
        <span v-if="result.error.code === 408">A solicitação demorou muito para ser processada e o servidor atingiu o tempo limite.</span>
        <span v-else>{{ result.error.message }}.</span>
        &nbsp;<a href="javascript:void(0)" @click="onRefresh">Tentar novamente</a>
      </div>
    </div>
    <div class="card-footer text-center" v-else-if="result.isEmpty()">
      <i class="icon-folder-search icon-2x text-muted mb-1"></i>
      <div class="card-title text-muted mb-0">{{ emptyText }}</div>
    </div>
    <div slot="footer" v-else>
      <div class="row">
        <div class="col-sm">
            <span class="b-pagination-line">{{ total }}</span>
        </div>
        <div class="col-sm">
          <b-pagination size="md" :total-rows="result.page.count" v-model="currentPage" :per-page="result.pageable.pageSize" @change="onPageChange"></b-pagination>
        </div>
      </div>
    </div>

  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { Page, Pageable, ResultList } from '@/models';

@Component
export default class TableCollapse extends Vue {
  @Prop({ default: false }) private collapsed!: boolean;
  @Prop({ default: true }) private collapsible!: boolean;
  @Prop({ default: true }) private refreshable!: boolean;
  @Prop({ default: 'Nenhum registro para exibir.' }) private emptyText!: string;
  @Prop() private header!: string;
  @Prop({ default: () => new ResultList<any>() }) private result!: ResultList<any>;
  @Prop({ default: 'Total de {total} registros' }) private totalText!: string;
  @Prop() private loading!: boolean;

  private currentPage: number;

  constructor() {
    super();
    this.currentPage = this.result.pageable.pageNumber;
  }

  private get total(): string {
    const text = this.result.page.count > 500 ? 'Aproximadamente {total} resultados' : this.totalText;
    return text.replace('{total}', String(this.result.page.count.toLocaleString('pt-BR')));
  }

  private onRefresh(): void {
    this.$emit('refresh', this.currentPage);
  }

  private onCollapse(collapsed: boolean): void {
    this.$emit('collapse', collapsed);
  }

  private onPageChange(pageNumber: number): void {
    this.$emit('page-change', pageNumber);
  }

  @Watch('result', { immediate: false, deep: true })
  private onResultChanged(value: ResultList<any>, oldValue: ResultList<any>): void {
    this.currentPage = this.result.pageable.pageNumber;
  }
}
</script>
