<template>
  <div class="block-ui">
    <div class="block-ui block-overlay"></div>
    <div class="block-ui block-msg block-element" style="top: 40%;">
      <i :class="spinnerClass"></i>
      <span v-if="loadingText" class="font-weight-semibold text-blue d-block">{{ loadingText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BlockUi extends Vue {
  @Prop({ default: 'icon-spinner2 spinner' }) private spinnerClass!: string;
  @Prop() private loadingText!: string;
}
</script>

<style lang="scss">
.block-ui.block-overlay {
  z-index: 1000;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: rgb(255, 255, 255);
  opacity: 0.9;
  cursor: wait;
  box-shadow: rgb(221, 221, 221) 0px 0px 0px 1px;
  position: absolute;
  }
.block-ui.block-element {
  z-index: 1011;
  position: absolute;
  padding: 0px;
  margin: 0px;
  width: 100%;
  bottom: 50%;
  text-align: center;
  color: rgb(0, 0, 0);
  border: 0px;
  cursor: wait;
}
</style>
