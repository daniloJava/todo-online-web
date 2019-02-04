<template>
  <div class="card">
    <div class="container">
      <el-form id="form" ref="form" :model="filter" label-position="top">
        <div class="row">
          <div class="col">
            <el-form-item id="title" prop="title">
              <div slot="label">
                <span>Title</span>
              </div>
              <el-input ref="title" type="text" v-model="filter.title" :maxlength="7" :class="{'is-success': !!filter.title}"></el-input>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item id="status" prop="status">
              <div slot="label">
                <span>Status</span>
              </div>
              <el-input type="text" v-model="filter.status" :maxlength="17" :class="{'is-success': !!filter.status}"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
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
