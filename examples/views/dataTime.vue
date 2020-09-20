<template>
  <div>
  <DatePicker v-model="value" :format="format"></DatePicker>
  <DatePicker v-model="value1" type="time"></DatePicker>
   <DatePicker v-model="value2" type="datetime"></DatePicker>
   <DateRangePicker v-model="value3" :format="format"></DateRangePicker>
   <!-- <DateFullRangePicker v-model="value4" :layout="layout" :startWeek="startWeek"></DateFullRangePicker> -->
  </div>
</template>

<script>
 export default {
  data() {
    return {
      format: 'YYYY-MM-DD',
      value: '2019-05-02',
      value1:"",
      value2:"",
      value3:{},
      value4: {
        start: '2017-01-01',
        end: '2018-01-01',
        type: 'year'
      },
      startWeek: 1,
      layout: ['year', 'quarter', 'month', 'week', 'date', 'customize'],
      startWeekDatas: [{ key: 1, title: '周一' }, { key: 7, title: '周日' }],
      layoutDatas: ['year', 'quarter', 'month', 'week', 'date', 'customize']
    };
  },

};
</script>

<style lang="scss" scoped>

</style>