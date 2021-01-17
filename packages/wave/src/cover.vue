<template>
<span class="v-wave-cover"
        ref="cover"
        :style="{left:  `${left}px`, top: `${top}px`, width: `${radius}px`, height: `${radius}px`,backgroundColor:attrs.waveColor}">
  </span>
</template>
<script>
export default {
  data () {
    return {
      radius: 0,
      left: 0,
      top: 0
    };
  },
  methods: {
    close () {
      // 清理当前组件并销毁当前实例
      this.$refs['cover'].parentNode.removeChild(this.$el);
      this.$destroy();
    },
  },
  mounted () {
    setTimeout(() => {
      this.close();
    }, 1000);
  },
};
</script>
