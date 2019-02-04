<template>
  <div id="example-list">
    <app-page-header title="Examples" subtitle="List"></app-page-header>

    <example-filter id="example-filter" :model="filter" :singles="singles" :multiples="multiples" @reset="onReset" @search="onSearch" @autocomplete="onAutocomplete"></example-filter>

    <example-table id="example-table" :page="page" :pageable="pageable" @page-changed="onPageChanged" @edit="onEdit" @view="onView" @delete="onDelete"></example-table>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';
import { Observable, Subscription } from 'rxjs';

import { Example, Page, Pageable, SubExample } from '@/models';
import { ExamplesService, SubExamplesService } from '@/services';
import ExampleFilter from '@/views/examples/shared/example-filter.vue';
import ExampleTable from '@/views/examples/shared/example-table.vue';

@Component({
  components: {
    ExampleFilter,
    ExampleTable,
  },
})
export default class ExampleList extends Vue {
  private subscription: Subscription = new Subscription();
  private subscriptionSingle: Subscription = new Subscription();
  private subscriptionMultiple: Subscription = new Subscription();
  private subscriptionAutocomplete: Subscription = new Subscription();

  private singles: SubExample[] = [];
  private multiples: SubExample[] = [];
  private filter: Example = new Example();
  private page: Page<any> = new Page();
  private pageable: Pageable = new Pageable(1, 10);

  private created() {
    this.subscriptionSingle = new SubExamplesService().listAll().subscribe((subExamples: SubExample[]) => {
      this.singles = subExamples;
    });

    this.subscriptionMultiple = new SubExamplesService().listAll().subscribe((subExamples: SubExample[]) => {
      this.multiples = subExamples;
    });
  }

  private beforeDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionSingle.unsubscribe();
    this.subscriptionMultiple.unsubscribe();
    this.subscriptionAutocomplete.unsubscribe();
  }

  private onAutocomplete(queryString: string, callback: (value: any) => void): void {
    // tslint:disable-next-line:max-line-length
    this.subscriptionAutocomplete = new SubExamplesService().listBy({ q: queryString }).subscribe((subExamples: SubExample[]) => {
      callback(subExamples);
    });
  }

  private onReset(): void {
    this.pageable = new Pageable(1, 10);
    this.page = new Page([], 0);
  }

  private onSearch(): void {
    const loading: any = this.$loading({ target: '#example-table', text: 'Processando solicitação...' });
    this.subscription = new ExamplesService().query(this.filter, this.pageable).subscribe((page: Page<Example>) => {
      loading.close();
      this.page = page;
    });
  }

  private onEdit(model: Example): void {
    this.$router.push({
      name: 'ExampleEdit',
      params: { id: model.id },
    });
  }

  private onView(model: Example): void {
    this.$router.push({
      name: 'ExampleDetail',
      params: { id: model.id },
    });
  }

  private onDelete(model: Example): void {
    new ExamplesService().delete(model.id);
  }

  private onPageChanged(pageNumber: number): void {
    // ...
  }
}
</script>
