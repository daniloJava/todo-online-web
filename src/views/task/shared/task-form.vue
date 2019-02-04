<template>
  <div class="card">
    <el-form label-position="top">
      <div class="row">
        <div class="col-sm">
          <el-form-item id="title" label="Placa">
            <el-input type="text" :value="model.title | title" ></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Task } from '@/models';

@Component
export default class TaskForm extends Vue {
  @Prop({ default: () => new Task() }) private model!: Task;
}
</script>
