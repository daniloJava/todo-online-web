<template>
  <app-card iconClass="icon-table" header="Resultado da pesquisa" bodyClass="p-0">
    <div class="alert alert-secondary border-0">
      <small>Clique sobre a linha do registro para detalhá-lo.</small>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Field avatar</th>
            <th>Field badge</th>
            <th>Field string</th>
            <th>Field number</th>
            <th>Field boolean</th>
            <th>Field cpf</th>
            <th>Field cnpj</th>
            <th>Field cpf/cnpj</th>
            <th>Field date</th>
            <th>Field time</th>
            <th>Field datetime</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="example in page.data" :key="example.id">
            <td>
              <app-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="medium" title="Origem da imagem"></app-avatar>
            </td>
            <td><span class="badge badge-flat border-danger text-danger-600">{{ example.fieldStatus }}</span></td>
            <td>{{ example.fieldString }}</td>
            <td>{{ example.fieldNumber }}</td>
            <td>{{ example.fieldBoolean | formatBoolean }}</td>
            <td>{{ example.fieldCpf | formatCpf }}</td>
            <td>{{ example.fieldCnpj | formatCnpj }}</td>
            <td>{{ example.fieldCpfCnpj | formatCpfCnpj }}</td>
            <td>{{ example.fieldDate | formatDate }}</td>
            <td>{{ example.fieldTime | formatTime }}</td>
            <td>{{ example.fieldDateTime | formatDateTime }}</td>
            <td>
              <el-dropdown @command="onActions" trigger="click">
                <span class="el-dropdown-link">
                  <i class="icon-menu9"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{ data: example, event: 'edit' }"><i class="icon-pencil7 mr-1"></i> Edit</el-dropdown-item>
                  <el-dropdown-item :command="{ data: example, event: 'view' }"><i class="icon-eye mr-1"></i> View</el-dropdown-item>
                  <el-dropdown-item :command="{ data: example, event: 'pdf' }"><i class="icon-file-pdf mr-1"></i> PDF</el-dropdown-item>
                  <el-dropdown-item :command="{ data: example, event: 'delete' }" divided class="text-danger"><i class="icon-trash mr-1"></i> Remove</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div slot="footer">
      <el-pagination layout="total, prev, pager, next" :page-size="pageable.pageSize" :total="page.count" @current-change="onPageChanged" background></el-pagination>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Example, Page, Pageable } from '@/models';

@Component({
  components: {},
})
export default class ExampleTable extends Vue {
  @Prop() private page!: Page<Example>;
  @Prop({ default: new Pageable(1, 10) }) private pageable!: Pageable;

  private onActions(command: any): void {
    if ('edit' === command.event) {
      this.onEdit(command.data as Example);

    } else if ('view' === command.event) {
      this.onView(command.data as Example);

    } else if ('delete' === command.event) {
      this.onDelete(command.data as Example);

    } else if ('pdf' === command.event) {
      this.onPdf(command.data as Example);

    } else {
      throw new Error(`Acão [${command.event}] selecionada não suportada.`);
    }
  }

  private onEdit(model: Example): void {
    this.$emit('edit', model);
  }

  private onView(model: Example): void {
    this.$emit('view', model);
  }

  private onPdf(model: Example): void {
    this.$emit('pdf', model);
  }

  private onDelete(model: Example): void {
    this.$confirm('Você confirma a exclusão desse registro?', 'Atenção', {
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      type: 'warning',
    }).then(() => {
      this.$emit('delete', model);
    }).catch((error) => alert(error));
  }

  private onPageChanged(pageNumber: number): void {
    this.$emit('pageChanged', pageNumber);
  }
}
</script>
