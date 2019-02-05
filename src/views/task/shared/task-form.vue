<template>
  <div class="card">
    <el-form id="form-task" ref="form" :model="model" label-position="top" status-icon>
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
        <div class="col-sm">
          <el-form-item id="group" prop="groupNome">
            <div slot="label">
              <span>Group Task</span>
            </div>
            <el-autocomplete v-model="groupNome" value-key="name" :fetch-suggestions="onGroupAutocomplete" @select="onGroupAutocompleteSelect" :debounce="500" :trigger-on-focus="false" placeholder="Digite parte do nome do município" :class="[{'is-success': !!model.group}, 'w-100']">
              <i slot="suffix" class="icon-search4"></i>
            </el-autocomplete>
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
