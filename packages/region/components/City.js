// import '../styles/city.scss'
// import '../styles/scroll.scss'

import { srcProvince, srcCity } from '../formatted'
import selector from '../mixins/selector'
import search from '../mixins/fixSearch'
import dropdown from './dropdown'

export default {
  name: 'VCityRegion',
  mixins: [search, selector],
  inheritAttrs: false,
  components: { dropdown },
  props: {
    i18n: {
      type: String,
      default: 'cn'
    },
    value: Array
  },
  data () {
    return {
      list: [],
      // 构建新的数据列表
      listBuilt: [],
      query: '',
      picked: []
    }
  },
  computed: {
    selectedText () {
      return this.picked.map(val => val.value).join(',')
    }
  },
  render (h) {
    /**
     * 省市组件布局
     */
    const child = []
    child.push(this.buildCaller(h))
    /**
     * 搜索栏组件元素
     */
    const searchWrap = 
    <div class="v-search-bar">
      <el-input ref="search" type="text" autocomplete="off" size={this.size} clearable={true} value={this.query} placeholder="请选择市区" on-input={(val)=>this.query = val.replace(/\s/g,"")}/>
    </div>
    child.push(searchWrap)
    /**
     * 省份和城市列表
     */
    const provinceCityWrap = 
    <div class="v-picker">
      {
        this.list.map(val => {
          return (
            <div key={val.province.key} class="v-picker__row">
              <dl>
                  <dt>{val.province.value}</dt>
                  <dd>
                    <ul>
                      {
                        val.citys.map(city => {
                          return (
                            <li key={city.key} class={{'selected': this.inPicked(city)}} on-click={()=>this.pick(city)}>
                              {city.value}
                            </li>
                          )
                        })
                      }
                    </ul>
                  </dd>
              </dl>
            </div>
          )
        })
      }
    </div>
    child.push(provinceCityWrap)

    // 挂到dropdown组件上
    return (
      <dropdown ref="drop" on-show={this.showChange}>{child}</dropdown>
    )
  },
  created () {
    this.prepared()
    this.list = this.listBuilt.slice()
  },
  methods: {
    prepared () {
      // 直辖市：北京、 天津、上海、 重庆，下面是对应的行政区码
      const municipalitys = ['110000', '120000', '310000', '500000']
      const municipality = '000000'
      // 特别行政区：香港、澳门
      const specialsRegion = ['810000', '820000']
      const special = '000010'

      const listTmp = []
      const municipalityObj = {
        province: { key: municipality, value: '直辖市' },
        citys: []
      }
      const specialObj = {
        province: { key: special, value: '特别行政区' },
        citys: []
      }
      // 整合省份，将省份对应的市区放在citys里面
      srcProvince.forEach(val => {
        if (municipalitys.includes(val.key)){
          municipalityObj.citys.push(val)
        } else if (specialsRegion.includes(val.key)) {
          specialObj.citys.push(val)
        } else {
          listTmp.push({ province: val, citys: [] })
        }
      })
      listTmp.forEach(val => {
        val.citys = srcCity.filter(value => {
          const num = Number.parseInt(val.province.key)
          return (value.key - num) < 1e4 && (value.key % num) < 1e4
        })
      })
      this.listBuilt = [...[municipalityObj], ...listTmp, ...[specialObj]]
    },
    // 调用adjust方法调整位置
    adjust () {
      this.$nextTick(() => {
        this.$refs.drop.adjust()
      })
    },
    emit (input = true) {
      if (input){
        this.$emit('input', this.picked.map(val => val.key))
      }
      this.$emit('change', this.picked)
    },
    /**
     * 判断v-model/value是否等于picked
     *
     * @param {array} keys
     * @returns
     */
    equal (keys) {
      if (keys.length === this.picked.length) {
        if (!keys.length) {
          return true
        }
        this.picked.forEach(val => {
          if (!keys.includes(val.key)) {
            return false
          }
        })
        return true
      } else {
        return false
      }
    },
    clear () {
      this.picked = []
      this.close()
      this.emit()
    },
    pick (item) {
      if (this.inPicked(item)) {
        this.picked.splice(this.picked.findIndex(val => val.key === item.key), 1)
      } else {
        this.picked.push(item)
      }
      this.emit()
      this.adjust()
    },
    inPicked (city) {
      if (!city || !this.picked.length) return false
      return this.picked.some(val => val.key === city.key)
    }
  },
  watch: {
    /**
     * 组件中的搜索
     * 首先会去搜索区域描述，如果没有结果，则搜索区域关键字
     * @param value
     */
    query (value) {
      const keyword = value.trim()
      if (keyword) {
        const list = []
        this.listBuilt.forEach(val => {
          const citys = val.citys.filter(city => new RegExp(keyword).test(city.value))
          if (citys.length){
            list.push({ province: val.province, citys: citys })
          }
        })
        this.list = list
      } else {
        this.list = this.listBuilt.slice()
      }
    },
    /**
     * 初始化已经选中的城市
     */
    value: {
      handler (val) {
        if (Array.isArray(val)) {
          if (this.equal(val)) return

          if (val.length) {
            const provincialCity = srcProvince.filter(item => val.includes(item.key))
            // 将province和city进行合并
            this.picked = [
              ...provincialCity,
              ...srcCity.filter(item => val.includes(item.key))
            ]
          } else this.picked = []

          this.emit(false)
        }
      },
      immediate: true
    }
  }
}