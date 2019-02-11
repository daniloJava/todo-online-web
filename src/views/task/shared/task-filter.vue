<template>
  <div class="app-container">
    <el-form ref="form" :model="filter" label-width="50px">
      <el-form-item id="title" label="Title" prop="title">
        <el-input ref="title" type="text" v-model="filter.title" :maxlength="7" :class="{'is-success': !!filter.title}"></el-input>
      </el-form-item>
      <el-form-item id="status" prop="status" label="Status" >
        <el-input type="text" v-model="filter.status" :maxlength="17" :class="{'is-success': !!filter.status}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button id="reset" type="default" @click="onReset"><i class="icon-eraser2 mr-1"></i>Limpar</el-button>
        <el-button id="search" type="primary" :loading="loading" @click="onSearch"><i :class="[ !loading ? 'icon-search4' : '', 'mr-1' ]"></i>{{ loading ? 'Pesquisando...' : 'Pesquisar' }}</el-button>
        <el-button id="create" type="success" :loading="loading" @click="onCreate"><i :class="[ !loading ? 'icon-search4' : '', 'mr-1' ]"></i>Create</el-button>
      </el-form-item>
    </el-form>
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

  private onCreate(): void {
    this.$emit('create');
  }

  private async validate(): Promise<boolean> {
    return true;
  }

}
</script>
