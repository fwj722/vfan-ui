<template>
  <div id="app">
    <v-button id="btn1" type="default">默认按钮</v-button>
    <v-button type="primary" shadow  @click="getMessage(1)">主要按钮</v-button>
    <v-button type="success" :waves="false" @click="getMessage(2)">成a功按钮</v-button>
    <v-button type="warning"   @click="getMessage(3)">警告按钮</v-button>
    <v-button type="danger" circle  @click="getMessage(4)">1</v-button>
    <v-button type="purple" @click="getMessage(5)">1</v-button>
    <v-button type="info"  @click="getMessage(6)">信息按钮</v-button>
    <v-button type="default" circle>V</v-button>
          <v-button type="primary" circle>F</v-button>
          <v-button type="success" circle>A</v-button>
          <v-button type="warning" circle>N</v-button>
          <v-button type="danger" circle>-</v-button>
          <v-button type="purple" circle>U</v-button>
          <v-button type="info" circle>I</v-button>
          <v-button type="text">默认按钮</v-button>
          <v-button type="text" disabled>主要按钮</v-button>
          <v-button type="primary" size="medium">中等按钮</v-button>
          <v-button type="primary" size="small">小型按钮</v-button>
          <v-button type="success" size="mini">超小按钮</v-button>

          <v-button type="primary" size="medium" round>中等按钮</v-button>
          <v-button type="primary" size="small" round>小型按钮</v-button>
          <v-button type="success" size="mini" round>超小按钮</v-button>
    <div style="height:50px"></div>
   
    <v-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名w称</span>
        <v-button style="float: right; padding: 3px 0" type="text">操作按钮</v-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
    </v-card>
    <br />
    <v-card shadow="always">总是显示
       <v-button type="primary" shadow  @click="getMessage(1)">主要按钮</v-button>
    </v-card>
    <br />
    <v-card shadow="hover">鼠标悬浮时显示</v-card>
    <br />
    <v-card shadow="never">从不显示</v-card>
   <div style="width:800px;height:500px;margin:10px auto 100px;">
     <v-player type="video" 
     :videoData="videoData" 
     poster="https://image.ms200.cn/icon/bg1.jpg">
   </v-player>
   </div>
  </div>
</template>
<script>
// import Vue from "vue"
export default {
  data() {
    return {
      videoData:[{
        src:"https://image.ms200.cn/video/0eae571cd79f52f3e5e4522ebdc5d1d5.mp4",
        size:720
      }]
    };
  },
  mounted(){
    //console.log(Vue.prototype.waves)
  },
  methods: {
    getMessage(n) {
      this.$message({
        message: "信息提示",
        type: n===1?"info":n===2?"success":n===3?"warning":n===4?"error":"info",
        autoClose: false,
        showClose: false,
        icoImg:"https://ms200.cn/wp-content/uploads/2020/05/cropped-ico-180x180.png",
        style:{
          color:"red",
          "font-size":"20px"
        }
      });
    },
    ccc(e){
      this.waves(e);
      console.log(11)
    }
  }
};
</script>
<style lang="scss">
</style>
