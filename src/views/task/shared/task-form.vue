<template>
  <div class="app-container">
    <el-form ref="form" :model="model" label-width="50px" label-position="top" status-icon>
      <el-form-item id="title-edit" label="Title" prop="title">
        <el-input ref="title" type="text" v-model="model.title" :maxlength="200" :autofocus="true"></el-input>
      </el-form-item>
      <el-form-item id="description-edit" label="Description" prop="description">
        <el-input ref="title" type="text" v-model="model.description" :maxlength="200"></el-input>
      </el-form-item>
      <el-form-item id="group-edit" prop="groupNome" label="Group Task" >
        <el-autocomplete v-model="groupNome" value-key="name" :fetch-suggestions="onGroupAutocomplete" @select="onGroupAutocompleteSelect" :debounce="500" :trigger-on-focus="false" placeholder="Digite parte do nome do município" :class="[{'is-success': !!model.group}, 'w-100']">
          <i slot="suffix" class="icon-search4"></i>
        </el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="onCancel">Cancelar</el-button>
        <el-button type="primary" @click="onSave"><i class="icon-checkmark2"></i> Salvar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Task, GroupTask } from '@/models';
import Rules from '@/validators/rules.validator';

@Component
export default class TaskForm extends Vue {
  @Prop({ default: () => new Task() }) private model!: Task;
  @Prop() private groups!: GroupTask[];

  private groupNome: string = '';

  private onCancel(): void {
    this.$emit('cancel', this.model);
  }

  private onSave(): void {
    this.$emit('save', this.model);
  }

  private onGroupAutocomplete(queryString: string, callback: (results: GroupTask[]) => void): void {
    this.$emit('group-autocomplete', queryString, callback);
  }

  private onGroupAutocompleteSelect(group: GroupTask): void {
    this.groupNome = group.name;
    this.$emit('group-autocomplete-select', group);
  }

}
</script>
