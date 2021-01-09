<template>
  <div class="layouts">
    <el-container style="height:100%">
      <el-header class="header-wrap">
        <header-model class="header-inner"></header-model>
      </el-header>
      <div class="container-layout">
  
          <el-container class="container-wrap">
            <el-aside width="220px"
                      class="aside-wrap">
              <menu-model :data="navsData['component']"></menu-model>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
      </div>
    </el-container>
  </div>
</template>
<script>
import HeaderModel from "./components/header";
import MenuModel from "./components/menu";
import navsData from './nav.config.json';
export default {
  components: {
    HeaderModel,
    MenuModel
  },

  data () {
    return {
      navsData
    };
  },
  methods: {}
};
</script>
<style lang="scss">
/* 引入代码高亮样式 */
@import "~highlight.js/styles/color-brewer.css";
html,
body,
.layouts {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header-wrap {
  background-color: #2b405f;
  height: 60px;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  box-shadow: 0 10px 14px 0px rgba(42, 93, 179, 0.3);
}
.container-wrap {
  overflow: auto;
  // height: 100%;
  .el-main {
    padding-left: 240px;
  }
}
.container-layout {
  position: absolute;
  width: 100%;
  top: 60px;
  bottom: 0;
  overflow: auto;
  background: #f7f8fa;
}
.aside-wrap {
  width: 220px;
  position: fixed;
  top: 0;
  bottom: 0;
  margin-top: 60px;
  z-index: 9999;
  width: 220px;
  background: #fff;
  padding: 10px 24px;
  box-shadow: 0 8px 12px #ebedf0;
}
@media screen and (min-width: 1200px) {
  .header-inner,
  .container-wrap {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
