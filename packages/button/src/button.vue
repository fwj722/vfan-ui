<template>
  <button
    class="v-button waves"
    @mousedown="wavesFun"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'v-button--' + type : '',
      buttonSize ? 'v-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import waves from "./../../utils/waves";
export default {
  name: "VButton",
  props: {
    hasWaves:{  // 开启水波纹效果
      type:Boolean,
      default:true
    },
    type: {
      type: String,
      default: "default"
    },
    size: String,
    icon: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  computed: {
    buttonSize() {
      return this.size;
    },
    buttonDisabled() {
      return this.disabled;
    }
  },
  methods: {
    wavesFun(e) {
      this.hasWaves && waves(e);
    }
    /*
    * 内部引入wave效果
    wavesFun(e) {
      const m = new this.MavesClass();
      m.showWaves(e.currentTarget, e);
    },
    //涟漪类，使其相对独立
    MavesClass() {
      this.showWaves = function(_this, e) {
        const box = _this;
        let wavesDiv = box.getElementsByClassName("waves");

        //第一次没有涟漪div，动态生成
        if (wavesDiv[0] == null) {
          const oSpan = document.createElement("span");
          oSpan.setAttribute("class", "waves mmd-waves-effect");
          box.appendChild(oSpan);
          const len = box.getElementsByTagName("span").length;
          wavesDiv = box.getElementsByTagName("span")[len - 1];
        } else {
          //设置按钮样式为’waves-effect‘即去掉动画样式’waves-effect-animation‘
          // wavesDiv[0].className = "mmd-waves-effect";
          wavesDiv[0].setAttribute("class", "waves mmd-waves-effect");
        }

        //计算涟漪坐标（折算成左上角坐标而非中心点），涟漪大小（取外标签最长边）
        let wH =
          box.offsetWidth > box.offsetHeight
            ? box.offsetWidth
            : box.offsetHeight;
        let iX = e.pageX - box.offsetLeft;
        let iY = e.pageY - box.offsetTop;
        let nX = iX - wH / 2;
        let nY = iY - wH / 2;

        let DivDom = null;

        if (!wavesDiv[0]) {
          //设置涟漪div样式，准备播放动画
          DivDom = wavesDiv;
        } else {
          DivDom = wavesDiv[0];
        }
        DivDom.style.width = wH + "px";
        DivDom.style.height = wH + "px";
        DivDom.style.left = nX + "px";
        DivDom.style.top = nY + "px";
        DivDom.setAttribute(
          "class",
          "waves mmd-waves-effect mmd-waves-effect-animation"
        );
      };
    }
    */
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.btn {
  background: purple;
  padding: 5px 10px;
  display: inline-block;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}

.waves {
  overflow: hidden;
  position: relative;
  text-align: center;
  position: relative;
}

.mmd-waves-effect {
  border-radius: 100%;
  background-color: #d8d8d8;
  left: 20px;
  top: 20px;
  transform: scale(0);
  width: 10px;
  height: 10px;
  position: absolute;
}

.mmd-waves-effect-animation {
  animation: mmd-maves-animation-definition 0.5s ease-out;
  /*兼容各大浏览器*/
  -moz-animation: mmd-maves-animation-definition 0.5s ease-out;
  -webkit-animation: mmd-maves-animation-definition 0.5s ease-out;
  -o-animation: mmd-maves-animation-definition 0.5s ease-out;
}
@keyframes mmd-maves-animation-definition {
  from {
    transform: scale(0.1);
    opacity: 0.5;
  }

  to {
    transform: scale(
      2
    ); /*因为涟漪的大小为标签的最长边，为了保证点击标签边缘时，涟漪也能覆盖整个标签，scale值最小应为2*/
    opacity: 0;
  }
}
</style>
