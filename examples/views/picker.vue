<template>
  <div>
    <Tabs :datas="param1" v-model="selected" @change="change1"></Tabs>

     <p>值：{{value}} <Button @click="getFullData">获取完整数据</Button></p>
     <CategoryPicker ref="CategoryPicker" :option="param" :type="type" :showAllLevels="showAllLevels" :multiple="multiple" :showChildCount="showChildCount" v-model="value"></CategoryPicker>
  </div>
</template>
<script>

import { getTotalData } from './../../packages/data/district';

export default {
  data() {
    return {
      param1: {
        module1: 'module1',
        module2: 'module2',
        module3: 'module3'
      },
      selected: 'module1',
      value: 330185,
      type: 'key',
      showChildCount: true,
      showAllLevels: true,
      multiple: true,
      param: {
        keyName: 'id',
        titleName: 'title',
        dataMode: 'list',
        parentName: 'parentId',
        datas: [],
        // 单选控制
        selectable(data) {
          return !data.children || data.children.length == 0;
        },
        // 多选控制
        checkable(data) {
          return !data.children || data.children.length == 0;
        }
      }
    };
  },
  mounted() {
    this.param.datas = getTotalData();
  },
  methods: {
     change1(data) {
       console.log(data)
      // this.$Message.info(`切换至${data.title}`, 1000);
    },
    getFullData() {
      console.log(this.$refs.CategoryPicker.getFullData());
    },
    changeValue() {
      if (this.type == 'key') {
        this.value = this.multiple ? [110117, 110101] : 110101;
      } else {
        this.value = this.multiple ? [ { 'id': '310101', 'title': '黄浦', 'traditionalTitle': '黃浦', 'pinyinTitle': 'Huangpu', 'parentId': 310000 }, { 'id': '310104', 'title': '徐汇', 'traditionalTitle': '徐匯', 'pinyinTitle': 'Xuhui', 'parentId': 310000 } ] : { 'id': '340102', 'title': '瑶海', 'traditionalTitle': '瑤海', 'pinyinTitle': 'Yaohai', 'parentId': '340100' };
      }
    }
  }
};
</script>