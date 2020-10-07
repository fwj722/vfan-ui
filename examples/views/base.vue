<template>
  <div id="app">
    <v-button id="btn1"
              type="default">默认按钮</v-button>
    <v-button type="primary"
              shadow
              @click="getMessage(1)">主要按钮</v-button>
    <v-button type="success"
              :waves="false"
              @click="getMessage(2)">成a功按钮</v-button>
    <v-button type="warning"
              @click="getMessage(3)">警告按钮</v-button>
    <v-button id="btn2"
              type="danger"
              circle
              @click="getMessage(4)">1</v-button>
    <v-button type="purple"
              @click="getMessage(5)">1</v-button>
    <v-button type="info"
              @click="getMessage(6)">信息按钮</v-button>
    <v-button type="default"
              circle>V</v-button>
    <v-button id="btn3"
              type="primary"
              circle>F</v-button>
    <v-button type="success"
              circle>A</v-button>
    <v-button type="warning"
              circle>N</v-button>
    <v-button type="danger"
              circle>-</v-button>
    <v-button type="purple"
              circle>U</v-button>
    <v-button type="info"
              circle>I</v-button>
    <v-button type="text">默认按钮</v-button>
    <v-button type="text"
              disabled>主要按钮</v-button>
    <v-button type="primary"
              size="medium">中等按钮</v-button>
    <v-button type="primary"
              size="small">小型按钮</v-button>
    <v-button type="success"
              size="mini">超小按钮</v-button>

    <v-button type="primary"
              size="medium"
              round>中等按钮</v-button>
    <v-button type="primary"
              size="small"
              round>小型按钮</v-button>
    <v-button type="success"
              size="mini"
              round>超小按钮</v-button>
    <div style="height:50px"></div>

    <v-card id="card"
            class="box-card">
      <div slot="header"
           class="clearfix">
        <span>卡片名w称</span>
        <v-button style="float: right; padding: 3px 0"
                  type="text">操作按钮</v-button>
      </div>
      <div v-for="o in 4"
           :key="o"
           class="text item">{{'列表内容 ' + o }}</div>
    </v-card>
    <br />
    <v-card shadow="always">总是显示
      <v-button type="primary"
                shadow>主要按钮</v-button>
    </v-card>
    <br />
    <v-card shadow="hover">鼠标悬浮时显示</v-card>
    <br />
    <v-card class="never" shadow="never">从不显示</v-card>
    <button  @click.stop="showGuide">显示引导层</button>
    <div class="video"
         style="width:800px;height:500px;margin:10px auto 100px;">
      <v-player type="video"
                :videoData="videoData"
                poster="https://image.ms200.cn/icon/bg1.jpg">
      </v-player>
      <v-player type="audio"
                :audioData="audioData"
                poster="https://image.ms200.cn/icon/bg1.jpg">
      </v-player>
    </div>

    <DateRangePicker v-model="value2"
                     :format="format"></DateRangePicker>
    <DatePicker v-model="value1"
                type="time"></DatePicker>
    <DatePicker v-model="value"
                :readonly="readonly"
                :disabled="disabled"
                :clearable="clearable"></DatePicker>
   
    <!-- <Avatar :src="src" :width="100" :fit="f" noInfo></Avatar> -->
    <div class="row">
      <CityPicker ref="CityPicker"
                      :option="param"
                      :type="type"
                      :showAllLevels="showAllLevels"
                      :multiple="multiple"
                      :showChildCount="showChildCount"
                      v-model="value3"></CityPicker>
    </div>
    
  </div>
</template>
<script>
// import Vue from "vue"
// import vm from "./assets/audioDemo.mp3"
// import date from "./../packages/utils/date"
// import { getTotalData } from "./../packages/data/district"
export default {
  data () {
    return {
      format: 'YYYY-MM-DD',
      value2: {},
      value: '2017-01-01',
      value3: 330185,
      value1: '',
      value8: '是',
      value7: 1,
      value6: false,
      param3: [{ title: '选择1', key: 'a1', other: '其他值' }, { title: '选择2', key: 'a2' }, { title: '选择3', key: 'a3' }],

      disabled: false,
      readonly: true,
      clearable: true,
      videoData: [{
        src: "https://image.ms200.cn/video/0eae571cd79f52f3e5e4522ebdc5d1d5.mp4",
        size: 720
      }],
      audioData: [],

      type: 'key',
      showChildCount: false,
      showAllLevels: true,
      multiple: false,
      param: {
        keyName: 'id',
        titleName: 'title',
        dataMode: 'list',
        parentName: 'parentId',
        datas: []
      }
    };
  },
  mounted () {
  },
  methods: {
    showGuide () {
      debugger
      const guideArr = [{
        element: '#btn1',
        popover: {
          // className: 'first-step-popover-class',
          title: 'Title on Popover',
          description: 'Body of the popover',
          position: 'right'
        }
      },
      {
        element: '#btn2',
        popover: {
          title: 'Title on Popover',
          description: 'Body of the popover',
          position: 'bottom'
        }
      },
      {
        element: '#card',
        popover: {
          title: 'Title on Popover',
          description: 'Body of the popover',
          position: 'right'
        }
      }, {
        element: '#btn3',
        popover: {
          title: 'Title on Popover',
          description: 'Body of the popover',
          position: 'right'
        }
      }, {
        element: '.never',
        popover: {
          title: 'Title on Popover',
          description: 'Body of the popover',
          position: 'top'
        }
      }, {
        element: '.row',
        popover: {
          title: 'Title on Popover',
          description: 'Body of the popover',
          position: 'bottom'
        }
      }, {
        element: '.video',
        popover: {
          title: 'Title on Popover',
          description: 'Body of the popover',
          position: 'bottom'
        }
      }]
      this.$guide(guideArr, {
          doneBtnText: "完成", //结束按钮的文字
          stageBackground: "#fff", //突出显示元素的背景颜色
          nextBtnText: "下一步", //下一步按钮的文字
          prevBtnText: "上一步", //上一步按钮的文字
          closeBtnText: "关闭", //关闭按钮的文字
          // onHighlightStarted:Element=> {},//元素即将突出显示时调用
          // onHighlighted:Element=> {},//元素完全突出显示时调用
          // onDeselected:Element=> {},//取消选择元素时调用
          // onReset:Element=> {},//当要清除叠加时调用
          // onNext:Element=> {},//在任何步骤中移动到下一步时调用
          // onPrevious :Element=> {}//在任何步骤中移动到上一步时调用
        })
    },
    getMessage (n) {
      this.$message({
        message: "信息提示",
        type: n === 1 ? "info" : n === 2 ? "success" : n === 3 ? "warning" : n === 4 ? "error" : "info",
        autoClose: true,
        showClose: false,
        icoImg: "https://ms200.cn/wp-content/uploads/2020/05/cropped-ico-180x180.png",
        style: {
          color: "red",
          "font-size": "20px"
        }
      });
    },
    ccc (e) {
      this.waves(e);
      console.log(11)
    },
    
  }
};
</script>
<style lang="scss">
.row {
  padding: 20px;
  margin: 0 auto;
}
</style>
