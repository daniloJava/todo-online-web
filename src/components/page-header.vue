<template>
  <div class="page-header">
    <div class="page-header-content header-elements-md-inline px-0">
      <div class="page-title d-flex">
        <h4>
          <i class="mr-2" :class="iconClass"></i>
          <span class="font-weight-semibold">{{ title }}</span>{{ subtitle ? ` - ${subtitle}` : '' }}
          <small style="margin-left: 1.65rem;" class="d-block text-muted">{{ description }}</small>
        </h4>
        <a href="#" class="header-elements-toggle text-default d-md-none">
          <i class="icon-more"></i>
        </a>
      </div>

      <div class="header-elements d-none text-center text-md-left mb-3 mb-md-0">
        <slot></slot>
      </div>
    </div>

    <div v-if="$slots.breadcrumb" style="margin-top: -45px; margin-left: 7px;" class="breadcrumb-line header-elements-md-inline">
      <div class="d-flex">
        <slot name="breadcrumb"></slot>

        <a href="javascript:void(0)" class="header-elements-toggle text-default d-md-none">
          <i class="icon-more"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PageHeader extends Vue {
  @Prop() private title!: string;
  @Prop() private subtitle!: string;
  @Prop() private description!: string;
  @Prop({ default: 'icon-arrow-down52' }) private iconClass!: string;
}
</script>
