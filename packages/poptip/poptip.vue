<template>
  <Tooltip ref="tooltip" :theme="theme" :disabled="disabled" :placement="placement" trigger="click">
    <slot></slot>
    <div slot="content" class="v-poptip">
      <div class="v-poptip-content">
        <i v-if="!hideIcon" class="v-icon" :class="icon" :style="{color: iconColor}"></i>
        {{content}}
      </div>
      <div class="clearfix"><div class="float-right"><v-button type="text" @click="close">{{'h.common.cancel' | hlang}}</v-button><v-button type="primary" size="mini"  @click="trigger">{{'h.common.confirm' | hlang}}</v-button></div></div>
    </div>
  </Tooltip>
</template>
<script>

export default {
  name: 'Poptip',
  props: {
    content: String,
    placement: {
      type: String,
      default: 'top'
    },
    theme: {
      type: String,
      default: 'white'
    },
    icon: {
      type: String,
      default: 'iconwenti'
    },
    iconColor: {
      type: String,
      default: '#f90'
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$refs.tooltip.hide();
    },
    trigger() {
      this.$emit('confirm');
      this.close();
    }
  }
};
</script>
