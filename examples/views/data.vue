<template>
  <div>
      <p id="btn1">value:{{value}}</p>
      <p><switchTab v-model="format" :datas="['YYYY-MM-DD', 'DD/MM/YYYY', 'YYYYMMDD']" @change="value = null"></switchTab></p>
      <DatePicker v-model="value"  :format="format"></DatePicker>
  
   <div id="btn2">
      <p><switchTab v-model="type" :datas="{year: '年', month: '月', quarter: '季度', week: '周', date: '日'}"></switchTab></p>
      <p>value:{{value}}</p>
      <DatePicker v-model="value" :type="type"></DatePicker>
  </div>
    <div>
      <p>value:{{value}}</p>
      <DatePicker v-model="value" type="time"></DatePicker>
  </div>
   <div>
      <p>value:{{value}}</p>
      <DatePicker v-model="value" type="datetime"  id="btn3"></DatePicker>
  </div>
  <button @click.stop="showGuide">显示引导层</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      format: 'YYYY-MM-DD',
      value: '2019-05-02',
      disabled: false,
      readonly: false,
      clearable: true,
      type: 'date'
    };
  },
  methods:{
    showGuide () {
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
      }, {
        element: '#btn3',
        popover: {
          title: 'Title on Popover',
          description: 'Body of the popover',
          position: 'right'
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
  }
};
</script>