<template>
  <div class="app-container">
    <el-form ref="form" :model="model" label-width="50px" label-position="top" status-icon>
      <el-form-item id="title-edit" label="Title">
        <el-input ref="title" type="text" v-model="model.title" :maxlength="200" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item id="description-edit" label="Description">
        <el-input ref="title" type="text" v-model="model.description" :maxlength="200" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="onBack">Back</el-button>
        <el-button type="primary" @click="onEdit(model)"><i class="el-icon-edit"></i>Edit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TaskService } from '@/services';
import { Task, GroupTask } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class TaskForm extends Vue {

  private model: Task = new Task();

  protected mounted(): void {
    if (this.$route.params.id) {
      TaskService.findById(parseInt(this.$route.params.id, 10)).toPromise()
        .then((task: Task) => {
          this.model = task;
        });
    }
  }

  private onBack(): void {
    this.$router.push({ name: 'TasksList' });
  }

  private onEdit(model: Task): void {
    this.$router.push({ name: 'TasksEdit', params: { id: '' + model.id } });
  }
}
</script>
