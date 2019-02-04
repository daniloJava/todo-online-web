<template>
  <div class="card">
    <el-form id="edit-task" ref="form" :model="model" label-position="top" status-icon>
      <div class="row">
        <div class="col-sm">
          <el-form-item id="title-edit" prop="title">
            <div slot="label">
              <span>Title</span>
            </div>
            <el-input ref="title" type="text" v-model="model.title" :maxlength="200" :autofocus="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item id="description-edit" prop="description">
            <div slot="label">
              <span>Description</span>
            </div>
            <el-input type="text" v-model="model.description" :maxlength="255"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer">
      <el-button type="text" @click="onCancel">Cancelar</el-button>
      <el-button type="primary" @click="onSave"><i class="icon-checkmark2"></i> Salvar</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Task } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class TaskForm extends Vue {
  @Prop({ default: () => new Task() }) private model!: Task;

  private onCancel(): void {
    this.$emit('cancel', this.model);
  }

  private onSave(): void {
    this.$emit('save', this.model);
  }

}
</script>
