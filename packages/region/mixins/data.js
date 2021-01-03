/*
 * @Description: 
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-12-02 09:19:42
 * @LastEditTime: 2020-12-07 13:53:43
 */
import { availableLevels } from '../helper'

export default {
  props: {
    city: {
      type: Boolean,
      default: true
    },
    area: {
      type: Boolean,
      default: true
    },
    town: {
      type: Boolean,
      default: false
    },
    i18n: {
      type: String,
      default: 'cn'
    },
    value: Object
  },
  data () {
    return {
      //级别列表数据
      listProvince: [],
      listCity: [],
      listArea: [],
      listTown: [],

      lang: {},

      region: {
        province: null,
        city: null,
        area: null,
        town: null
      }
    }
  },
  watch: {
    value: {
      handler: 'modelChange',
      deep: true
    }
  },
  computed: {
    selectedText () {
      const arr = []
      const { province, city, area, town } = this.region
      if (province) arr.push(province.value)
      if (city) arr.push(city.value)
      if (area) arr.push(area.value)
      if (town) arr.push(town.value)
      return arr.join('-')
    },
    availableLevels () {
      return availableLevels(this.city, this.area, this.town)
    },
    currentLevels () {
      return Object.entries(this.region).filter(([, value]) => value).map(([key,]) => key)
    }
  }
}
