<template>
  <div class="card">
    <div class="card-img-actions">
      <el-carousel height="300px" :autoplay="false">
        <el-carousel-item v-for="item in 4" :key="item">
          <img class="card-img-top img-fluid" src="http://demo.interface.club/limitless/bs4/Template/global_assets/images/demo/flat/4.png" alt="">
          <div class="card-img-actions-overlay card-img-top">
            <a href="http://demo.interface.club/limitless/bs4/Template/global_assets/images/demo/flat/4.png" class="btn btn-outline bg-white text-white border-white border-2" data-popup="lightbox">
              Preview
            </a>
            <a href="#" class="btn btn-outline bg-white text-white border-white border-2 ml-2">
              Details
            </a>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="card-body">
      <h5 class="card-title">Top placement</h5>
      <p class="card-text">Default <code>top</code> placement - image always comes first in the card with text or other content below. Use <code>.card-img-top</code> image class to round top image corners.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ExamplePhoto extends Vue {
}
</script>

<style <style lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>