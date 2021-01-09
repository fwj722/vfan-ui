<template>
  <div class="v-wave-box" ref="box" @click="handleClick">
    <div class="v-wave-covers" ref="covers"></div>
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue';
import cover from './cover';
import { getOffsetTop, getOffsetLeft } from './../../../src/utils/dom';
let CoverExtend = Vue.extend(cover);
export default {
  name: "VWave",
  methods: {
    handleClick (e) {
      // 获取容器宽度
      let offsetWidth = this.$refs['box'].offsetWidth;
      let offsetHeight = this.$refs['box'].offsetHeight;
      let radius = Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight) * 2;

      // 获取容器的坐标
      let offsetLeft = getOffsetLeft(this.$refs['box']);
      let offsetTop = getOffsetTop(this.$refs['box']);

      // 获取点击坐标
      let event = e || window.event;
      let clientX = event.pageX;
      let clientY = event.pageY;

      // 获取点击相对容器的坐标
      let left = clientX - offsetLeft;
      let top = clientY - offsetTop;

      let instance = new CoverExtend({
        data: {
          left, top, radius,attrs:this.$attrs
        }
      });
      instance.vm = instance.$mount();
      this.$refs['covers'].appendChild(instance.vm.$el);
    },
  }
};
</script>
