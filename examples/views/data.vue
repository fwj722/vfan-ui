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
  
  }
};
</script>