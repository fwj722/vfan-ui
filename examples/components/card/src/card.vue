<template>
  <div class="v-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="v-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="v-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VCard',
    props: {
      header: {},
      bodyStyle: {},
      shadow: {
        type: String
      }
    }
  };
</script>
