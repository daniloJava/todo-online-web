<template>
  <app-card iconClass="icon-pencil7" header="Formulário">
    <el-form ref="form" :model="model" :rules="rules" label-position="top" status-icon>
      <div class="row">
        <div class="col-sm">
          <el-form-item prop="fieldString">
            <div slot="label">
              <span>Field string</span>
              <el-tooltip effect="dark" content="Uma dica de preenchimento para o campo string. (Ex: ABCDEfghij)" placement="top">
                <i class="icon-help"></i>
              </el-tooltip>
            </div>
            <el-input type="text" v-model="model.fieldString" :maxlength="20" :autofocus="true"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item prop="fieldNumber">
            <div slot="label">
              <span>Field number</span>
              <el-tooltip effect="dark" content="Uma dica de preenchimento para o campo número. (Ex: 1234567890)" placement="top">
                <i class="icon-help"></i>
              </el-tooltip>
            </div>
            <el-input type="number" v-model="model.fieldNumber" :min="0" :max="9999999999"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <el-form-item prop="fieldDate">
            <div slot="label">
              <span>Field date</span>
              <el-tooltip effect="dark" content="Uma dica de preenchimento para o campo date. (Ex: 2018-08-20)" placement="top">
                <i class="icon-help"></i>
              </el-tooltip>
            </div>
            <el-date-picker type="date" v-model="model.fieldDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="w-100"></el-date-picker>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item prop="fieldTime">
            <div slot="label">
              <span>Field time</span>
              <el-tooltip effect="dark" content="Uma dica de preenchimento para o campo time. (Ex: 23:56)" placement="top">
                <i class="icon-help"></i>
              </el-tooltip>
            </div>
            <el-time-picker v-model="model.fieldTime" format="HH:mm" value-format="HH:mm" :arrow-control="true" class="w-100"></el-time-picker>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Example } from '@/models';
import Rules from '@/validators/rules.validator';

@Component({
  components: {},
})
export default class ExampleTab1 extends Vue {
  @Prop() private model!: Example;

  private rules: any = {
    fieldString: [ Rules.required, Rules.min ],
  };
}
</script>
