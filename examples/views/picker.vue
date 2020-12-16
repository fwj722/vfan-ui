<template>
  <div class="cate">
    基本用法：
    type:用来控制数据类型，可以为key和object。option是地址选择的配置项，具体请看下方表格介绍。showAllLevels是否展示所有的路径。multiple是单选还是多选。showChildCount是否显示市区的数量。v-model默认选中的项。
    <div>
      <p>值：{{value}} <v-button size="mini" type="primary" @click="getFullData">获取完整数据</v-button></p>
    <p>
      值类型：<SwitchTab v-model="type" :datas="{key: 'id', object: 'object'}" small @change="changeValue"></SwitchTab>
    </p>
    <p>
      选择值：<SwitchTab v-model="defaultSelect" :datas="selectList" small @change="changeSelect"></SwitchTab>
    </p>
    <p>
      显示所有的层级：<SwitchTab v-model="showLevel" :datas="selectLevelList" small @change="changeLevel"></SwitchTab>
    </p>
    <p>
      展示市区数量：<SwitchTab v-model="showCityNum" :datas="cityNum" small @change="changeNum"></SwitchTab>
    </p>
    </div>
     <CityPicker ref="CityPicker" :option="param" :type="type" :showAllLevels="showAllLevels" :multiple="multiple" :showChildCount="showChildCount" v-model="value"></CityPicker>
     
    <CityPicker :disabled="true"  v-model="CityPicker" :showAllLevels="false"></CityPicker>
  </div>
</template>
<script>


export default {
  data() {
    return {
      CityPicker:"",
      value: 330185,
      type: 'key',
      showChildCount: false,
      showAllLevels: true,
      multiple:false,
      selectList:["单选","多选"],
      defaultSelect:"单选",
      selectLevelList:["是","否"],
      showLevel:"否",
      cityNum:["是","否"],
      showCityNum:"是",
      param: {
        keyName: 'id',
        titleName: 'title',
        dataMode: 'list',
        parentName: 'parentId',
        // datas: [],
        // 单选控制
        // selectable(data, level) {
        //   console.log(data,level)
        //   return !data.children || data.children.length == 0;
        // },
        // // 多选控制
        // checkable(data) {
        //   // console.log(level)
        //   return !data.children || data.children.length == 0;
        // }
      }
    };
  },
  mounted() {
    // this.param.datas = getTotalData();
  },
  methods: {
    getFullData() {
      console.log(this.$refs.CityPicker.getFullData());
    },
    changeValue() {
      if (this.type == 'key') {
        this.value = this.multiple ? [110117, 110101] : 110101;
      } else {
        this.value = this.multiple ? [ { 'id': '310101', 'title': '黄浦', 'traditionalTitle': '黃浦', 'pinyinTitle': 'Huangpu', 'parentId': 310000 }, { 'id': '310104', 'title': '徐汇', 'traditionalTitle': '徐匯', 'pinyinTitle': 'Xuhui', 'parentId': 310000 } ] : { 'id': '340102', 'title': '瑶海', 'traditionalTitle': '瑤海', 'pinyinTitle': 'Yaohai', 'parentId': '340100' };
      }
    },
    changeSelect(val){
      if(val.key==="单选"){
        this.multiple = false
      }else{
        this.multiple = true
      }
    },
    changeLevel(val){
      if(val.key==="是"){
        this.showAllLevels = true
      }else{
        this.showAllLevels = false
      }
    },
    changeNum(val){
      if(val.key==="是"){
        this.showChildCount = true
      }else{
        this.showChildCount = false
      }
    }
  }
};
</script>
<style>
  .cate{
    padding: 20px;
  }
</style>