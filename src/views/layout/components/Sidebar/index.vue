<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SidebarItem from './SidebarItem.vue';

@Component({
  components: {
    SidebarItem,
  },
})
export default class SideBar extends Vue {
  get sidebar() {
    return '';
  }

  get routes() {
    return (this.$router as any).options.routes;
  }

  get isCollapse() {
    return false;
  }
}
</script>
