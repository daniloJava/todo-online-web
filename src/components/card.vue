<template>
  <div class="card">

    <!-- Header -->
    <div class="card-header" :class="{ 'header-elements-inline': $slots.actions || collapsible || refreshable}" v-if="$slots.header || header">
      <slot name="header">

        <!-- Header title -->
        <h6 class="card-title font-weight-bold" v-if="header">
          <i :class="icon" class="mr-1" v-if="icon"></i>
          {{ header }}
          <span class="badge badge-pill bg-grey-700 ml-2" v-if="badgeable">{{ badge }}</span>
        </h6>
        <!-- ./header title -->

        <!-- Header actions -->
        <div class="header-elements" v-if="hasActionSlot">
          <slot name="actions"></slot>
        </div>
        <div class="header-elements" v-else-if="!hasActionSlot && (collapsible || refreshable)">
          <div class="list-icons">
            <a href="javascript:void(0)" @click="onCollapse" :title="[innerCollapsed ? 'Clique para exibir o conteúdo retraído' : 'Clique para ocultar o conteúdo expandido']" class="list-icons-item" v-show="collapsible">
              <i :class="[innerCollapsed ? 'icon-arrow-up12' : 'icon-arrow-down12']"></i>
            </a>
            <a href="javascript:void(0)" @click="onRefresh" title="Clique para atualizar o conteúdo exibido" class="list-icons-item"  v-show="refreshable && !innerCollapsed">
              <i class="icon-sync"></i>
            </a>
          </div>
        </div>
        <!-- ./header actions -->

      </slot>
    </div>
    <!-- ./header -->

    <el-collapse-transition>
      <div v-show="!innerCollapsed">
        <div class="card-body" :class="bodyClass">
          <slot></slot>
        </div>

        <div class="card-footer" :class="footerClass" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() private badge!: string;
  @Prop() private bodyClass!: string;
  @Prop({ default: false }) private collapsed!: boolean;
  @Prop() private collapsible!: boolean;
  @Prop({ default: 'd-flex justify-content-end' }) private footerClass!: string;
  @Prop() private header!: string;
  @Prop() private icon!: string;
  @Prop() private iconClass!: string;
  @Prop() private refreshable!: boolean;
  @Prop() private badgeable!: boolean;

  private innerCollapsed: boolean;

  constructor() {
    super();
    this.innerCollapsed = this.collapsed;
  }

  private get hasActionSlot(): boolean {
    const slot: any = this.$slots.actions && this.$slots.actions[0];
    return slot && slot.children > 0;
  }

  private onCollapse(): void {
    this.innerCollapsed = !this.innerCollapsed;
    this.$emit('collapse', this.innerCollapsed);
  }

  private onRefresh(): void {
    this.$emit('refresh', {});
  }

  @Watch('collapsed', { immediate: false, deep: true })
  private onCollapsedChanged(value: boolean, oldValue: boolean): void {
    if (value !== oldValue) {
      this.innerCollapsed = value;
    }
  }
}
</script>
