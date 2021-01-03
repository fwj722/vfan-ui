/*
 * @Description:
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-12-02 09:19:42
 * @LastEditTime: 2020-12-03 17:04:46
 */
import language from '../language'

export default {
  props: {
    size: {
      // 控制按钮的尺寸，elementui中表单元素的属性
      type: String,
      default: 'mini'
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    close() {
      if (this.show) this.$refs.drop.visible()
    },
    showChange(val) {
      this.show = val
    },
    adjust() {
      this.$nextTick(() => {
        this.$refs.drop.adjust()
      })
    },
    /**
     * 创建默认的区域按钮
     *
     * @param {createElement} h
     * @returns
     */
    buildCaller() {
      const caller = []
      const lang = language[this.i18n]
      if ('default' in this.$scopedSlots) {
        // 如果是通过自定义scoped slot传值
        caller.push(
          this.$scopedSlots.default({
            region: this.region,
            show: this.show
          })
        )
      } else {
        // 否则使用默认的按钮
        const customDom = (
          <el-button
            size={this.size}
            type="button"
            class={{ 'button-wrap': true, 'v-opened': this.show }}
            style={{ width: '100%' }}
          >
            <span>
              {this.selectedText ? this.selectedText : lang.pleaseSelect}
            </span>
            {this.selectedText ? 
              <span
                class="v-clear-btn el-icon-close"
                title={lang.clear}
                on-click={e => {
                  e.stopPropagation()
                  this.clear()
                }}
              ></span>
            : 
              <span class="v-icon-arrow-toggle el-icon-arrow-down"></span>
            }
          </el-button>
        )
        caller.push(customDom)
      }
      return (
        <template slot="caller">
          <div class="v-caller-container">{caller}</div>
        </template>
      )
    }
  }
}
