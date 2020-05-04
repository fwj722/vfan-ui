<template>
  <div id="app">
    <v-button type="default">默认按钮</v-button>
    <v-button type="primary">主要按钮</v-button>
    <v-button type="success">成功按钮</v-button>
    <v-button type="warning">警告按钮</v-button>
    <v-button type="danger">危险按钮</v-button>
    <v-button type="purple">其他按钮</v-button>
    <v-button type="info">信息按钮</v-button>
    <div>
       <div class="demo2" v-drag="'#dragable'">
            <div id="dragable"><span>这里可以拖动</span></div>
            <div class="content"><span>这里不可以</span></div>
        </div>

    </div>
  </div>
</template>
<script>

export default {
};
</script>
<style lang="scss"></style>
