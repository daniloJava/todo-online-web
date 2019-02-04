<template>
  <app-card iconClass="icon-filter3" header="Filtros para pesquisa">
    <div class="alert alert-primary border-0" style="margin-left: -20px; margin-right: -20px;">
      <small>Pesquisa com <b class="font-weight-bold">" * "</b> - Retorna todos os registros que possuam as combinações informadas Ex.: TUD*1. Resultado: TUD1001, TUD0021, TUD0001.</small>
      <br>
      <small>Pesquisa com <b class="font-weight-bold">" ? "</b> - Substitui um caractere desconhecido (ou que não se deseja informar) em determinada posição no campo de pesquisa. Ex1.: SAV?002. Resultado: SAV0002, SAV7002. Ex.2: SAV000?. Resultado: SAV0002, SAV0005, SAV0008. Ex3.: BGT??37. Resultado: BGT1237, BGT5937.</small>
    </div>

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
        <div class="col-sm">
          <el-form-item prop="selectSingle">
            <div slot="label">
              <span>Select single</span>
              <el-tooltip effect="dark" content="Uma dica de preenchimento para o campo select one. (Ex: Opção 1)" placement="top">
                <i class="icon-help"></i>
              </el-tooltip>
            </div>
            <el-select v-model="model.selectSingle" filterable placeholder="Selecione uma opção..." class="w-100">
              <el-option v-for="item in singles" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item prop="selectMultiple">
            <div slot="label">
              <span>Select multiple</span>
              <el-tooltip effect="dark" content="Uma dica de preenchimento para o campo select multiple. (Ex: Opção 1, Opção 2)" placement="top">
                <i class="icon-help"></i>
              </el-tooltip>
            </div>
            <el-select v-model="model.selectMultiple" filterable multiple collapse-tags placeholder="Selecione as opções..." class="w-100">
              <el-option v-for="item in multiples" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item prop="fieldAutocomplete">
            <div slot="label">
              <span>Field autocomplete</span>
              <el-tooltip effect="dark" content="Uma dica de preenchimento para o campo autocomplete. (Ex: Text)" placement="top">
                <i class="icon-help"></i>
              </el-tooltip>
            </div>
            <el-autocomplete v-model="model.fieldAutocomplete" value-key="label" :fetch-suggestions="onAutocomplete" :debounce="500" placeholder="Digite o termo de pesquisa" class="w-100">
              <i slot="suffix" class="icon-search4"></i>
            </el-autocomplete>
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
        <div class="col-sm">
          <el-form-item prop="fieldDateTime">
            <div slot="label">
              <span>Field datetime</span>
              <el-tooltip effect="dark" content="Uma dica de preenchimento para o campo datetime. (Ex: 2018-08-20 22:45:34)" placement="top">
                <i class="icon-help"></i>
              </el-tooltip>
            </div>
            <el-date-picker type="datetime" v-model="model.fieldDateTime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" class="w-100"></el-date-picker>
          </el-form-item>
        </div>
        <div class="col-sm">
          <el-form-item prop="fieldBoolean">
            <div slot="label">
              <span>Field boolean</span>
              <el-tooltip effect="dark" content="Uma dica de preenchimento para o campo boolean. (Ex: clicked)" placement="top">
                <i class="icon-help"></i>
              </el-tooltip>
            </div>
            <el-checkbox v-model="model.fieldBoolean" label="Uma pergunta?" border class="w-100"></el-checkbox>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer">
      <el-button type="default" @click="onReset"><i class="icon-eraser2"></i> Limpar</el-button>
      <el-button type="primary" @click="onSearch"><i class="icon-search4"></i> Pesquisar</el-button>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Example, SubExample } from '@/models';
import Rules from '@/validators/rules.validator';

@Component({
  components: {},
})
export default class ExampleFilter extends Vue {
  @Prop() private singles!: SubExample[];
  @Prop() private multiples!: SubExample[];
  @Prop() private suggestions!: SubExample[];
  @Prop() private model!: Example;

  private rules: any = {
    fieldString: [ Rules.required, Rules.min ],
  };

  private onReset(): void {
    const form: any = this.$refs.form;
    form.resetFields();

    this.$emit('reset', form);
  }

  private onSearch(): void {
    const form: any = this.$refs.form;
    form.validate((isValid: boolean) => {
      if (!isValid) {
        return false;
      }

      this.$emit('search', form);
    });
  }

  private onAutocomplete(queryString: string, callback: () => void): void {
    this.$emit('autocomplete', queryString, callback);
  }
}
</script>
