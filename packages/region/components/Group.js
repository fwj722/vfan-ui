// import '../styles/group.scss'

import dropdown from './dropdown'
import data from '../mixins/data'
import method from '../mixins/method'
import search from '../mixins/fixSearch'
import selector from '../mixins/selector'
import {
  PROVINCE_LEVEL,
  CITY_LEVEL,
  AREA_LEVEL,
  TOWN_LEVEL,
  LEVELS,
  LEVEL_LIST
} from '../constants'

export default {
  name: 'VGroupRegion',
  mixins: [data, method, search, selector],
  inheritAttrs: false,
  components: { dropdown },
  props: {
    search: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      query: '',
      level: -1
    }
  },
  watch: {
    /**
     * 搜索功能
     * 首先去搜索区域的描述，如果没有搜素到会去搜索区域的关键字
     * @param value
     */
    query(value) {
      const list = this.getList(this.level)
      let tmp = []
      tmp = list.filter(val =>
        val.value.toLowerCase().includes(value.toLowerCase())
      )
      if (tmp.length === 0) tmp = list.filter(val => val.key.includes(value))
      this.list = tmp
    },
    level(val) {
      this.list = this.getList(val)
      this.adjust()
    }
  },
  render(h) {
    const child = []

    child.push(this.buildCaller(h))
    child.push(this.cityHeader())
    child.push(this.citySearch())
    child.push(this.cityTabs())
    child.push(this.cityContent())

    return (
    <dropdown ref="drop" on-show={this.showChange}>{child}</dropdown>
    )
  },
  methods: {
    cityHeader() {
      const renderDom = (
        <div class="v-header">
          <h3>
            <span class={{ 'v-header-selected': this.selectedText }}>
              {this.selectedText || this.lang.defaultHead}
            </span>
          </h3>
          <div class="operating">
            <el-button
              type="text"
              title={this.lang.clear}
              size={this.size}
              class="v-removeall-button"
              on-click={this.clear}
            >
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button
              type="text"
              title={this.lang.done}
              class="v-done-button"
              size={this.size}
              on-click={this.close}
            >
              <i class="el-icon-check"></i>
            </el-button>
          </div>
        </div>
      )
      return renderDom
    },

    citySearch() {
      if (!this.search) {
        return
      } else {
        return (
          <div class="v-search">
            <el-input
              ref="search"
              type="text"
              clearable={true}
              size={this.size}
              autocomplete="off"
              value={this.query}
              onInput={(val)=>this.query = val.replace(/\s/g,"")}
            />
          </div>
        )
      }
    },
    cityTabs() {
      const getDom = (
        <div class="v-level-tabs">
          <ul>
            {LEVELS.map(val => {
              if (this.levelAvailable(val.index)) {
                return (
                  <li
                    key={val.index}
                    class={{ active: val.index === this.level }}
                  >
                    <a on-click={() => (this.level = val.index)}>{val.title}</a>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      )
      return getDom
    },
    cityContent() {
      let child = []
      if (this.list.length) {
        child = this.list.map(val => {
          return (
            <li
              key={val.key}
              class={{ 'v-item': true, active: this.match(val) }}
              on-mouseup={() => this.pick(val)}
            >
              {val.value}
            </li>
          )
        })
      } else {
        child = [<li class="v-message-box">{this.lang.noMatch}</li>]
      }

      return (
        <div class="v-results-container">
          <ul class="v-results">{child}</ul>
        </div>
      )
    },
    // 检查区域级别是否可用
    levelAvailable(level) {
      switch (level) {
        case PROVINCE_LEVEL:
          return true
        case CITY_LEVEL:
          return this.city
        case AREA_LEVEL:
          return this.city && this.area
        case TOWN_LEVEL:
          return this.city && this.area && this.town
      }
    },
    // 切换到下一级时加载列表数据
    getList(val) {
      switch (val) {
        case PROVINCE_LEVEL:
          return this.listProvince
        case CITY_LEVEL:
          return this.listCity
        case AREA_LEVEL:
          return this.listArea
        case TOWN_LEVEL:
          return this.listTown
      }
    },
    match(item) {
      if (!item || !Object.keys(item).length) return false
      const R = this.region
      const key = item.key
      switch (this.level) {
        case PROVINCE_LEVEL:
          return R.province && R.province.key === key
        case CITY_LEVEL:
          return R.city && R.city.key === key
        case AREA_LEVEL:
          return R.area && R.area.key === key
        case TOWN_LEVEL:
          return R.town && R.town.key === key
      }
    },
    nextLevel(level) {
      if (level === TOWN_LEVEL) return level
      return LEVELS[level + 1].index
    },
    pick(item) {
      const nextLevel = this.nextLevel(this.level)
      const attr = LEVEL_LIST[this.level]
      this.region[attr] = item
      this.change()

      if (this.levelAvailable(nextLevel) && this.level !== nextLevel) {
        this.level = nextLevel
      } else {
        this.close()
      }
    },
    clear() {
      this.clearRegion(PROVINCE_LEVEL)
      this.level = PROVINCE_LEVEL
      this.change()
    }
  },
  beforeMount() {
    this.level = PROVINCE_LEVEL
  }
}
