<template>
  <div id="example-edit">
    <app-page-header title="Examples" subtitle="Edit"></app-page-header>
    <div class="breadcrumb-line header-elements-md-inline" style="margin-top: -45px; margin-left: 6px;">
      <div class="d-flex">
        <div class="breadcrumb">
          <a href="index.html" class="breadcrumb-item"> Início</a>
          <a href="content_cards_content.html" class="breadcrumb-item">Examples</a>
          <span class="breadcrumb-item active">Record XXX</span>
        </div>

        <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-4">
        <example-photo id="example-photo"></example-photo>
      </div>
      <div class="col-sm-8">
        <example-form id="example-form" :model="model" :singles="singles" :multiples="multiples" @cancel="onCancel" @save="onUpdate" @autocomplete="onAutocomplete"></example-form>

        <el-tabs tab-position="top" style="height: 200px;">
          <el-tab-pane label="Tab 1">
            <example-tab1 :model="model"></example-tab1>
          </el-tab-pane>
          <el-tab-pane label="Tab 2">Tab 2</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observable, Subscription } from 'rxjs';

import { Example, SubExample } from '@/models';
import { ExamplesService, SubExamplesService } from '@/services';
import ExampleForm from '@/views/examples/shared/example-form.vue';
import ExamplePhoto from '@/views/examples/shared/example-photo.vue';
import ExampleTab1 from '@/views/examples/shared/example-tab1.vue';

@Component({
  components: {
    ExampleForm,
    ExamplePhoto,
    ExampleTab1,
  },
})
export default class ExampleEdit extends Vue {
  private subscription: Subscription = new Subscription();
  private subscriptionSingle: Subscription = new Subscription();
  private subscriptionMultiple: Subscription = new Subscription();
  private subscriptionAutocomplete: Subscription = new Subscription();

  private singles: SubExample[] = [];
  private multiples: SubExample[] = [];
  private model: Example = new Example();

  public created() {
    this.subscriptionSingle = new SubExamplesService().listAll().subscribe((subExamples: SubExample[]) => {
      this.singles = subExamples;
    });

    this.subscriptionMultiple = new SubExamplesService().listAll().subscribe((subExamples: SubExample[]) => {
      this.multiples = subExamples;
    });
  }

  public beforeDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionSingle.unsubscribe();
    this.subscriptionMultiple.unsubscribe();
    this.subscriptionAutocomplete.unsubscribe();
  }

  public onAutocomplete(queryString: string, callback: (param: any) => void): void {
    // tslint:disable-next-line:max-line-length
    this.subscriptionAutocomplete = new SubExamplesService().listBy({ q: queryString }).subscribe((subExamples: SubExample[]) => {
      callback(subExamples);
    });
  }

  public onCancel(model: Example): void {
    this.$router.push({
      name: 'ExampleList',
    });
  }

  public onUpdate(): void {
    const loading: any = this.$loading({ target: '#example-form', text: 'Processando solicitação...' });
    this.subscription = new ExamplesService().update(this.model).subscribe((updatedModel: Example) => {
      loading.close();
      this.model = updatedModel;
    });
  }
}
</script>
