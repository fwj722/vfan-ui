/* 
 * @Description: 打开面板时获取焦点，同时对浏览器做兼容
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-12-02 09:19:42
 * @LastEditTime: 2020-12-03 10:15:55
 */
export default {
  methods: {
    inputFocus () {
      if (!this.show) return
      this.$nextTick(() => {
        /**
         * 修复当打开面板并获得焦点时页面跑到顶部的问题：
         * this.$refs.search.focus({preventScroll:true}); 
         * 仅仅对Chrome and EDGE有效 
         */
        if(this.search){
          if (this.isChrome() || this.isEdge()){
            this.$refs.search.focus({ preventScroll: true })
          }else {
            const x = window.pageXOffset
            const y = window.pageYOffset
            this.$refs.search.focus()
            if (window.pageYOffset !== y) setTimeout(() => { window.scrollTo(x, y) }, 0)
          }
        }
      })
    },
    isChrome () {
      return navigator.vendor !== undefined && navigator.vendor.indexOf('Google') !== -1
    },
    isEdge () {
      return navigator.userAgent.indexOf('Edge') >= 0
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.inputFocus()
      }
    }
  }
}
