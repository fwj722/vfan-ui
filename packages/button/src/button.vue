<template>
  <button
    class="v-button"
    @mousedown="wavesFun"
    @click="$emit('click')"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'v-button--' + type : '',
      buttonSize ? 'v-button--' + buttonSize : '',
      {
        'waves':waves,
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-shadow':shadow
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i class="icon" :class="icon" v-if="icon && !loading"></i>
    <span class="defaultCls" v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Vue from "vue"
export default {
  name: "VButton",
  props: {
    waves:{  // 开启水波纹效果
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
    circle: Boolean,
    shadow:Boolean
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
      // this.waves && Vue.prototype.waves(e);
    }
  }
};
</script>
</style>
