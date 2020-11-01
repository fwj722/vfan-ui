<template>
  <div class="v-switchlist" :class="{'v-switchlist-small':small}" :disabled="disabled">
    <span :checked="option[key]==value" :disabled="disabled" v-for="option of arr" :key="option[key]" @click="setvalue(option)"><i v-if="option.icon" :class="option.icon"></i>{{option[title]}}</span>
  </div>
</template>
<script>
import config from './../../utils/config';

export default {
  name: 'SwitchTab',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    data: [Object, Array],
    disabled: {
      type: Boolean,
      default: false
    },
    dict: String,
    value: [String, Boolean, Number],
    keyName: {
      type: String,
      default: () => config.getOption('dict', 'keyName')
    },
    titleName: {
      type: String,
      default: () => config.getOption('dict', 'titleName')
    }
  },
  data() {
    return {
      key: this.keyName,
      title: this.titleName
    };
  },
  methods: {
    setvalue(option) {
      let key = option[this.key];
      if (this.disabled) return;
      if (key == this.value) return;
      this.$emit('input', key);
      this.$emit('change', option);
      let event = document.createEvent('CustomEvent');
      event.initCustomEvent('setvalue', true, true, this.value);
      this.$el.dispatchEvent(event);
    }
  },
  computed: {
    arr() {
      if (!this.data && !this.dict) {
        console.error('缺少参数data，对tab组件进行切换，必须要定义数据参数。');
        return [];
      }
      let datas = this.data;
      if (this.dict) {
        datas = config.getDict(this.dict);
      }

      return config.initOptions(datas, this);
    }
  }
};
</script>
