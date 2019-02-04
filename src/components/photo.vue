<template>
  <div class="card-img-actions">
    <viewer v-if="zoomable" ref="viewer" :options="viewerOptions" @inited="inited" class="viewer">
      <img :src="src" alt="Foto" :title="title" class="card-img-top img-fluid" :key="src">
    </viewer>
    <img v-else :src="src" alt="Foto" :title="title" :style="'height: ' + height + 'px;'" class="card-img-top img-fluid">

    <div v-if="hasData() || hasError()" :title="title" class="card-img-actions-overlay card-img-top">
      <a v-if="hasData()" @click="onZoom($event)" :title="zoomTitle" class="btn btn-outline bg-white text-white border-white border-2">
        {{ zoomText }}
      </a>
      <a v-if="selectable && hasData()" @click="onSelect($event)" :title="selectTitle" :class="innerSelected ? 'btn btn-outline bg-success text-success border-success border-2 ml-2' : 'btn btn-outline bg-danger text-danger border-danger border-2 ml-2'">
        <i :class="innerSelected ? 'icon-user-check' : 'icon-user-cancel'"></i>
      </a>
      <a v-else-if="hasError()" @click="onReload($event)" :title="reloadTitle" class="btn btn-outline bg-danger text-danger border-danger border-2">
        {{ reloadText }}
      </a>
    </div>

    <app-block-ui v-if="loading" spinnerClass="icon-spinner10 spinner icon-2x text-blue-600"></app-block-ui>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Photo extends Vue {
  @Prop() private data!: any | Error;
  @Prop() private loading!: boolean;
  @Prop({ default: '/photos/foto-padrao.jpg' }) private emptyData!: string;
  @Prop({ default: '/photos/timeout.png' }) private errorData!: string;
  @Prop({ default: 260 }) private height!: number;
  @Prop({ default: 200 }) private width!: number;
  @Prop({ default: 'Recarregar' }) private reloadText!: string;
  @Prop({ default: 'Clique para tentar recarregar a foto novamente' }) private reloadTitle!: string;
  @Prop({ default: 'Zoom' }) private zoomText!: string;
  @Prop({ default: 'Clique para ampliar a foto' }) private zoomTitle!: string;
  @Prop({ default: 'Origem da foto não disponível' }) private description!: string;
  @Prop({ default: 'Clique para selecionar a foto' }) private selectTitle!: string;
  @Prop({ default: false }) private selected!: boolean;
  @Prop({ default: false }) private zoomable!: boolean;
  @Prop({ default: true }) private selectable!: boolean;

  private innerSelected: boolean;
  private viewerOptions: any;

  constructor() {
    super();
    this.innerSelected = this.selected;
    this.viewerOptions = {
      toolbar: false,
      navbar: false,
    };
  }

  private onReload(event: Event): void {
    this.$emit('reload', event);
  }

  private onZoom(event: Event): void {
    const self = this;

    if (self.zoomable) {
      const instance: any = self.$refs.viewer;
      instance.$viewer.show();

    } else {
      self.$emit('zoom', event);
    }
  }

  private onSelect(event: Event): void {
    this.innerSelected = !this.innerSelected;
    this.$emit('select', this.innerSelected);
  }

  @Watch('selected', { immediate: false, deep: true })
  private onSelectedChanged(value: boolean, oldValue: boolean): void {
    if (value !== oldValue) {
      this.innerSelected = value;
    }
  }

  private hasData(): boolean {
    const self = this;
    return (self.data && typeof self.data === 'string') ||
           (self.data && (self.data.src || (self.data.base64 && !self.data.error) ));
  }

  private hasError(): boolean {
    const self = this;
    return (self.data && self.data.error);
  }

  private isBase64(value: string): boolean {
    try {
      return btoa(atob(value)) === value;
    } catch (err) {
      return false;
    }
  }

  private get src(): string {
    const self = this;
    let src = '';

    if (self.hasData()) {
      src = typeof self.data === 'string' ? self.data : (self.data && (self.data.src || self.data.base64));

    } else if (self.hasError()) {
      src = self.errorData;

    } else if (self.emptyData) {
      src = self.emptyData;
    }

    return self.isBase64(src) ? `data:image/jpg;base64,${src}` : src;
  }

  private get title(): string {
    return this.description;
  }
}
</script>
