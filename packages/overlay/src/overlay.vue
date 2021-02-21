<template>
  <div  v-show="show" class="v-overlay">
    <span  v-if="showBtn" class="close el-icon-circle-close" @click="handleOverlay"></span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:"VOverlay",
    props:{
      showBtn:{
        type:Boolean,
        default:false
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        
      }
    },
    methods:{
      handleOverlay(){
        this.$emit("click")
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>