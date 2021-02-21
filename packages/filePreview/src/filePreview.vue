<template>
  <div class="full">
    <iframe class="filePreview" :src="`https://view.xdocin.com/xdoc?_xdoc=${url}`"></iframe>
  </div>
</template>

<script>
  export default {
    name:"VFilePreview",
    props:{
      url:{
        type:String,
        required:true
      }
    }
  }
</script>

<style lang="scss">
.full{
   width: 80%;
   height: 80%;
}
.filePreview{
  width: 100%;
  height:100%;
}
</style>