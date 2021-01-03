/*
 * @Description: 下拉面板/下拉菜单容器,并根据窗口自动定位适配到合适的位置展示
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-12-07 09:56:01
 * @LastEditTime: 2020-12-07 17:35:48
 */
// import './../styles/dropdown.scss'

export default {
  name: 'v-dropdown',
  props: {
    /**
     * 下拉框的对齐方向
     */
    align: {
      type: String,
      default: 'left'
    },
    // 下拉框是否展示边框
    border: {
      type: Boolean,
      default: false
    },
    //鼠标右键点击按钮来显示下拉菜单
    rightClick: {
      type: Boolean,
      default: false
    },
    //控制选择按钮，当点击的时候显示下拉面板，再次点击时关闭下拉面板
    toggle: {
      type: Boolean,
      default: true
    },
    //手动显示和关闭下拉菜单
    manual: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 打开和关闭时的动画
     * true: 使用默认动画，
     * false:关闭动画
     * 当值为字符串时使用自定义的动画
     */
    animated: {
      type: [String, Boolean],
      default: "el-zoom-in-top" // elementui中自带的动画类名
    },
    /**
     * 
     * 下拉面板的宽度，最小宽度是80
     */
    width: Number,
    /**
     * 按钮的内容
     *  --false: inline-block
     *  --true: block
     */
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      styleSheet: { top: '', left: '' },
      dropdownClass: 'v-dropdown-container',
      dropUp: false,
      x: null,
      y: null
    }
  },
  computed: {
    animate () {
      if (typeof this.animated === 'string') return this.animated
      if (this.animated) return this.dropUp ? 'animate-up' : 'animate-down'
      return ''
    }
  },
  render () {
    const children = []
    if ('caller' in this.$scopedSlots) {
      children.push(this.$scopedSlots.caller())
    }
    const dropTrans = 
    <transition name={this.animate}>
      <div class={{
        [this.dropdownClass]:true,
        'v-dropdown-no-border': !this.border
      }}
      style={this.styleSheet}
      v-show={this.show}
      ref="dropdown"
      on-mousedown={e=>{e.stopPropagation()}}>
        {this.$slots.default}
      </div>
    </transition>
    children.push(dropTrans)

    const dropdownWrap= 
    <div class={{
      'v-dropdown-caller': true,
      'v-dropdown-caller--full-width': this.fullWidth
    }} on-click={e=>{
      if (this.rightClick || this.manual) return
      e.stopPropagation()
      this.visible()
    }}
    on-contextmenu={
      (e)=>{
        e.stopPropagation();e.preventDefault()
        const info = this.scrollInfo()
        this.x = e.pageX || (e.clientX + info.x)
        this.y = e.pageY || (e.clientY + info.y)
        this.visible()
      }
    }>
      {children}
    </div>
    return dropdownWrap
  },
  methods: {
    visible (outside = false) {
      if (this.disabled) return
      //当toggle设置为false时，不能切换下拉面板的显示与关闭
      if (this.show && !this.toggle && !outside) return
      // 计算面板显示的方向（在上或在下）
      if (!this.show && this.$slots.caller) {
        this.adjust()
      }
      this.show = !this.show
      this.$emit('show', this.show)
    },
    /**
     * 点击下拉框外面
     * @param e   鼠标事件
     */
    whole (e) {
      if (this.show) {
        // 点击选择按钮
        console.log(this,this.$el)
        const inCaller = this.eventPath(e).findIndex(val => val === this.$el) !== -1
        // toggle设置为false时，不能切换下拉面板的显示与关闭
        if (inCaller && !this.toggle && !this.rightClick) return
        /**
         * 点击下拉面板以外时关闭下拉面板
         * 当鼠标右键单击按钮时打开下拉面板，即：rightClick = true
         */
        if (!inCaller || (inCaller && this.rightClick)) {
          this.visible(true)
        }
      }
    },
    /**
     * 调整下拉框显示的位置
     */
    adjust () {
      const pos = this.$el.getBoundingClientRect()
      let menu = null

      if (this.show) {
        menu = this.$refs.dropdown.getBoundingClientRect()
      }
      else {
        /**
         * 将下拉面板隐藏时的'display:none' 改变为 'visibility:hidden'和 'display':'inline-block',
         * 目的是用于获取宽度和高度
         */
        this.$refs.dropdown.style.visibility = 'hidden'
        this.$refs.dropdown.style.display = 'inline-block'
        menu = this.$refs.dropdown.getBoundingClientRect()
        // 获取位置数据后恢复下拉面板的样式
        this.$refs.dropdown.style.visibility = 'visible'
        this.$refs.dropdown.style.display = 'none'
      }

      this.adjustTop(pos, menu)
      this.styleSheet.left = `${this.adjustLeft(pos, menu)}px`
    },
    /**
     * 计算方向和上轴
     * @param pos
     * @param menu
     */
    adjustTop (pos, menu) {
      const gap = 5
      const scrollTop = window.pageYOffset
      const viewHeight = document.documentElement.clientHeight
      const srcTop = this.rightClick ? this.y : pos.top + scrollTop
      let t = this.rightClick ? this.y : pos.top + pos.height + gap + scrollTop
      let overDown = false; let overUp = false; let up = false
      // list over screen
      if ((t + menu.height) > (scrollTop + viewHeight)) overDown = true
      if ((srcTop - gap - menu.height) < scrollTop) overUp = true

      if (!overUp && overDown) {
        t = srcTop - gap - menu.height
        up = true
      }
      this.dropUp = up
      this.styleSheet.top = `${t}px`
    },
    adjustLeft (pos, menu) {
      const scrollLeft = window.pageXOffset; const viewWid = document.documentElement.clientWidth
      const wid = this.rightClick ? 0 : pos.width
      // 左对齐 
      const left = this.rightClick ? this.x : pos.left + scrollLeft
      // 居中对齐
      const center = (left + (wid / 2)) - (menu.width / 2)
      // 右对齐
      const right = (left + wid) - menu.width

      switch (this.align) {
        case 'left': return (left + menu.width) > (scrollLeft + viewWid) ? right : left
        case 'center':
          if ((center + menu.width) > (scrollLeft + viewWid)) return right
          else if (right < scrollLeft) return left
          else return center
        case 'right': return (right < scrollLeft) ? left : right
      }
    },
    scrollInfo () {
      const supportPageOffset = window.pageXOffset !== undefined
      const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')

      return {
        x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
        y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
      }
    },
    /**
     * 
     * @param e - MouseEvent
     * @returns {Array|EventTarget[]|*}
     */
    eventPath (e) {
      if ('composedPath' in e) {
        return e.composedPath()
      }else if ('path' in e) {
        return e.path
      }
      /**
       * 此处的代码是为了做兼容处理，当浏览器不兼容上面部分的代码时，下面的代码会生效，否则下面的代码不起作用
       * polyfill
       *向下做兼容
       * @var {[Array]} --从当前元素开始到最顶部的dom对象数组
       */
      const path = []
      let currentElem = e.target
      while (currentElem) {
        path.push(currentElem)
        currentElem = currentElem.parentElement
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document)
      if (path.indexOf(window) === -1) path.push(window)
      return path
    }
  },
  mounted () {
    if (this.width) this.styleSheet.width = this.width + 'px'
    else {
      document.body.appendChild(this.$refs.dropdown)
      document.body.addEventListener('mousedown', this.whole)
    }
  },
  beforeDestroy () {
    // 销毁时移除dropdown
    document.body.removeEventListener('mousedown', this.whole)
      this.$refs.dropdown.remove()
  },
  destroyed () {
    this.$el.remove()
  }
}
