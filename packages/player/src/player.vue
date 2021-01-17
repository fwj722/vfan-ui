<template>
  <div id="vplayer" :options="options"></div>
</template>

<script>
import Player from "xgplayer"
export default {
  name: 'VPlayer',
  props:['options'],
  mounted () {
    
    const options = {
          id: 'vplayer',
          url: '',
          autoplay: false,//自动播放
          fluid: true,// 流式布局
          volume: 0.6, //音量 
          playbackRate: [0.5, 0.75, 1, 1.5, 2],// 倍速
          pip: true,// 画中画
          pipConfig: {
            bottom: 0,
            right: 0,
            width: 320,
            height: 180,
            screenShot: true,
            progressDot: [{ time: 10 }, { time: 22 }, { time: 56 }],
            errorTips: `请<span>刷新</span>试试`
          },
          cssFullscreen: true
    }
    const params = Object.assign({},options,this.options)
    let  player = new Player(params);
    this.$emit("player",player)


  }
}
</script>

<style lang="scss" scoped>
</style>