/*
 * @Description:
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-12-03 14:46:40
 * @LastEditTime: 2020-12-07 10:19:02
 */
import dropdown from './dropdown'
import selector from '../mixins/selector'

export default {
  name: 'VSelectRegion',
  components: { dropdown },
  mixins: [selector],
  props: {
    list: {
      type: Array,
      required: true
    },
    blankText: String,
    value: Object
  },
  data() {
    return {
      selected: this.value
    }
  },
  inject: ['disabled', 'blank'],
  watch: {
    value: {
      handler(val) {
        this.selected = val
      },
      deep: true
    }
  },
  computed: {
    content() {
      return this.selected && this.selected.value
        ? this.selected.value
        : this.blank
        ? this.blankText
        : '&nbsp;'
    }
  },
  render() {
    // trigger
    const selectBtnWrap = (
      <template slot="caller">
        <el-button
          size={this.size}
          type="button"
          class={{ 'button-wrap': true, 'v-opened': this.show }}>
          <span class="v-select__content">{this.content}</span>
          <span class="v-icon-arrow-toggle el-icon-arrow-down"></span>
        </el-button>
      </template>
    )
    // “请选择”提示
    const listItem = <ul class="v-select__list">
    {this.blank && (
      <li on-click={() => this.pick(null)}>{this.blankText}</li>
    )}
    {...this.list.map(val => {
      return (
        <li
          key={val.key}
          class={{
            selected: this.selected && this.selected.key === val.key
          }}
          on-click={() => {
            this.pick(val)
          }}
        >
          {val.value}
        </li>
      )
    })}
  </ul>
  
    return (
      <dropdown
        ref="drop"
        class="v-select v-caller-container"
        disabled={this.disabled}
        on-show={this.showChange}
      >
        {selectBtnWrap}
        {listItem}
      </dropdown>
    )
  },
  methods: {
    pick(val) {
      this.selected = val
      this.$emit('input', val)
      this.close()
    }
  }
}
