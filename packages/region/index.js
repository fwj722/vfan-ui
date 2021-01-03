/*
 * @Description: 
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-12-02 09:19:42
 * @LastEditTime: 2020-12-07 17:24:32
 */
// import './styles/region.scss'
import { SELECT, TEXT, GROUP, COLUMN, CITY } from './constants'

import SelectGroup from './components/SelectGroup'
import GroupRegion from './components/Group'
import ColumnGroup from './components/ColumnGroup'
import CityPicker from './components/City'
import TextGroup from './components/Text'
export default {
  name: 'VRegion',
  components: {
    'v-select': SelectGroup,
    'v-group': GroupRegion,
    'v-column': ColumnGroup,
    'v-city': CityPicker,
    'v-text': TextGroup
  },
  props: {
    type: {
      type: String,
      default: GROUP
    },
    fullWidth:Boolean
  },
  render(h) {
    if (this.type) {
      switch (this.type.toLowerCase()) {
        case TEXT:
          return this.build(h, 'v-text')
        case SELECT:
          return this.build(h, 'v-select')
        case GROUP:
          return this.build(h, 'v-group')
        case COLUMN:
          return this.build(h, 'v-column')
        case CITY:
          return this.build(h, 'v-city')
      }
    }
  },
  methods: {
    build(h, name) {
      const slot = []
      const options = {
        class: this.fullWidth?'v-button-block':'v-city-picker',
        props: [this.$attrs,this.fullWidth,this.width],
        on: this.$listeners
      }
      if ('default' in this.$scopedSlots) {
        switch (this.type.toLowerCase()) {
          case COLUMN:
          case GROUP:
            options.scopedSlots = {
              default: props => {
                return this.$scopedSlots.default({
                  region: props.region,
                  show: props.show
                })
              }
            }
            break
          case CITY:
            slot.push(this.$scopedSlots.default())
            break
        }
      }
      return h(name, options, slot)
    }
  }
}

