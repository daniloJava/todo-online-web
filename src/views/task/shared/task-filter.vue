<template>
  <div class="card">
    <div class="alert alert-primary border-0 rounded-0" style="margin-left: -20px; margin-right: -20px;">
      <small>Pesquisa com <b class="font-weight-bold">" * "</b> - Retorna todos os registros que possuam as combinações informadas Ex.: TUD*1. Resultado: TUD1001, TUD0021, TUD0001.</small>
      <br>
      <small>Pesquisa com <b class="font-weight-bold">" ? "</b> - Substitui um caractere desconhecido (ou que não se deseja informar) em determinada posição no campo de pesquisa. Ex1.: SAV?002. Resultado: SAV0002, SAV7002. Ex.2: SAV000?. Resultado: SAV0002, SAV0005, SAV0008. Ex3.: BGT??37. Resultado: BGT1237, BGT5937.</small>
    </div>

    <el-form id="form" ref="form" :model="filter" label-position="top">
      <div class="row">
        <div class="col-sm">
          <el-form-item id="title" prop="title">
            <div slot="label">
              <span>Title</span>
            </div>
            <el-input ref="title" type="text" v-model="filter.title" :maxlength="7" :class="{'is-success': !!filter.title}"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="status" prop="status">
            <div slot="label">
              <span>Status</span>
            </div>
            <el-input type="text" v-model="filter.status" :maxlength="17" :class="{'is-success': !!filter.status}"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer">
      <el-button id="reset" type="default" @click="onReset"><i class="icon-eraser2 mr-1"></i>Limpar</el-button>
      <el-button id="search" type="primary" :loading="loading" @click="onSearch"><i :class="[ !loading ? 'icon-search4' : '', 'mr-1' ]"></i>{{ loading ? 'Pesquisando...' : 'Pesquisar' }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'lodash';

import { FilterTask, Task } from '@/models';

@Component
export default class TaskFilter extends Vue {
  @Prop({ default: () => new FilterTask() }) private filter!: FilterTask;
  @Prop({ default: false }) private loading!: boolean;

  protected mounted(): void {
    const self = this;

    // Força o focus no primeiro input da tela após mudança da rota
    (self.$refs.title as HTMLInputElement).focus();

  }

  private onReset(): void {
    const form: any = this.$refs.form;
    form.resetFields();
    (this.$refs.title as HTMLInputElement).focus();
    this.$emit('reset', form);
  }

  private onSearch(): void {
    const self = this;

    const form: any = self.$refs.form;
    form.validate(async (isValid: boolean) => {
      if (!isValid) {
        return false;
      }

      try {
        await self.validate();

      } catch (error) {
        self.$notify.error(error.message);
        return false;
      }

      self.$emit('search', form);
    });
  }

  private async validate(): Promise<boolean> {
    return true;
  }

}
</script>
