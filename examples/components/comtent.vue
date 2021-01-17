<template>
 <el-container class="container-wrap">
    <el-aside width="220px"
              class="aside-wrap">
      <menu-model :data="navsData['component']"></menu-model>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import MenuModel from "./menu";
import navsData from './../nav.config.json';
  export default {
    components: {
    MenuModel
  },
    data () {
      return {
        navsData
      };
    },
  }
</script>

<style lang="scss" scoped>

</style>