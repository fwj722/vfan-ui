/*
 * @Description:
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-12-02 09:19:42
 * @LastEditTime: 2020-12-03 17:42:25
 */
// import '../styles/select.scss'

import data from '../mixins/data'
import method from '../mixins/method'
import select from './Select'

export default {
  name: 'VSelectGroupRegion',
  mixins: [data, method],
  components: {
    'v-select': select
  },
  props: {
    blank: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  provide() {
    return {
      disabled: this.disabled,
      blank: this.blank
    }
  },
  render(h) {
    const child = []
    const { province, city, area, town } = this.region

    child.push(
      this.build({
        list: this.listProvince,
        model: province,
        callback: val => {
          this.region.province = val
        }
      })
    )

    if (this.city) {
      child.push(
        this.build({
          list: this.listCity,
          model: city,
          callback: val => {
            this.region.city = val
          }
        })
      )
    }
    if (this.city && this.area) {
      child.push(
        this.build({
          list: this.listArea,
          model: area,
          callback: val => {
            this.region.area = val
          }
        })
      )
    }
    if (this.city && this.area && this.town) {
      child.push(
        this.build({
          list: this.listTown,
          model: town,
          callback: val => {
            this.region.town = val
          }
        })
      )
    }

    return h('div', child)
  },
  methods: {
    build({ list, model, callback }) {
      return (
        <v-select
          blankText={this.lang.pleaseSelect}
          value={model}
          list={list}
          on-input={val => {
            callback(val)
            this.change()
          }}
        ></v-select>
      )
    }
  }
}
