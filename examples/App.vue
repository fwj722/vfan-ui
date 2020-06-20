<template>
  <div id="app">
    <v-button id="btn1" type="default">默认按钮</v-button>
    <v-button type="primary"   @click="getMessage(1)">主要按钮</v-button>
    <v-button type="success"   @click="getMessage(2)">成功按钮</v-button>
    <v-button type="warning"   @click="getMessage(3)">警告按钮</v-button>
    <v-button type="danger"   @click="getMessage(4)">危险按钮</v-button>
    <v-button type="purple"  @click="getMessage(5)">消息弹框</v-button>
    <v-button type="info"  @click="getMessage(6)">信息按钮</v-button>
    <div style="height:50px"></div>
    <div>
      <div class="demo2" v-drag="'#dragable'">
        <div id="dragable">
          <span>这里可以拖动</span>
        </div>
        <div class="content">
          <span>这里不可以</span>
        </div>
      </div>
    </div>
    <v-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <v-button style="float: right; padding: 3px 0" type="text">操作按钮</v-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
    </v-card>
    <br />
    <v-card shadow="always">总是显示</v-card>
    <br />
    <v-card shadow="hover">鼠标悬浮时显示</v-card>
    <br />
    <v-card shadow="never">从不显示</v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  mounted(){},
  methods: {
    getMessage(n) {
      this.$message.message({
        message: "信息提示",
        type: n===1?"info":n===2?"success":n===3?"warning":n===4?"error":"info",
        autoClose: true,
        showClose: false
      });
    },
  }
};
</script>
<style lang="scss"></style>
