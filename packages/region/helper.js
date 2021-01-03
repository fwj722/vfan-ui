import { srcList, srcCity, srcArea } from './formatted'
import {
  LEVEL_LIST,
  PROVINCE_KEY, CITY_KEY, AREA_KEY, TOWN_KEY,
  CITY_LEVEL, AREA_LEVEL, TOWN_LEVEL
} from './constants'

/**
 * 通过province数据加载 city城市列表
 *
 * @param province
 * @returns {Array}
 */
export function loadCity (province) {
  if (province && Object.keys(province).length) {
    const list = srcCity.filter(val => {
      const num = Number.parseInt(province.key)
      return (val.key - num) < 1e4 && (val.key % num) < 1e4
    })
    // Municipalities directly under the central government
    return list.length ? list : [province]
  } else return []
}

/**
 * load area list by city data
 *
 * @param city
 * @returns {Array}
 */
export function loadArea (city) {
  if (city && Object.keys(city).length) {
    const cityKey = Number.parseInt(city.key)
    const isNotProvince = cityKey % 1e4
    const calcNum = isNotProvince ? 100 : 1e4
    const list = srcArea.filter(val => {
      return (val.key - cityKey) < calcNum && val.key % cityKey < calcNum
    })
    // Prefecture-level city
    return list.length ? list : [city]
  } else return []
}

/**
 * 按地区数据area 加载城镇列表town
 * @param area
 * @returns {Array}
 */
export function loadTown (area) {
  let list = null
  if (area && Object.keys(area).length) {
    let towns = null
    /* eslint-disable */
    try {
      towns = require(`./data/town/${area.key}.json`);
    } catch (e) {
      console.warn(`${area.value} 下面没有城镇数据.`);
    }
    /* eslint-enable */
    list = towns && Object.keys(towns).length
      ? Object.entries(towns).map(val => ({ key: val[0], value: val[1] }))
      : []
  } else list = []
  return list
}

/**
 *通过level级别加载对应的列表数据
 *
 * @export
 * @param {number} level
 * @returns
 */
export function getLoader (level) {
  switch (level) {
    case CITY_LEVEL: return loadCity
    case AREA_LEVEL: return loadArea
    case TOWN_LEVEL: return loadTown
  }
}

/**
 * 获取有效的区域级别
 *
 * @export
 * @param {boolean} city
 * @param {boolean} area
 * @param {boolean} town
 */
export function availableLevels () {
  const result = [PROVINCE_KEY]
  const switchs = Array.from(arguments)

  for (let i = 0; i < switchs.length; i++) {
    if (switchs[i]) {
      result.push(LEVEL_LIST[i + 1])
    } else {
      return result
    }
  }

  return result
}

/**
 * 检查model是否有效
 *
 * @export
 * @param {object} model
 * @returns {boolean}
 */
export function validModel (model) {
  return Boolean(model && Object.keys(model).length && LEVEL_LIST.every(val => val in model))
}

/**
 * 通过key值找到对应的详情
 *
 * @param {string} key
 */
const getDetail = key => {
  const item = srcList.find(val => val.key === key)
  if (item && Object.keys(item).length) {
    return {
      key: item.key,
      value: item.value
    }
  } else return null
}

/**
 *从model获取当前操作的数据对象
 * model 格式:
 * {
 *   province: 'xxx',
 *   city: 'xxx',
 *   area: 'xxx',
 *   town: 'xxx'
 * }
 *
 * 操作对象的格式:
 * {
 *   province: { key: 'xxx', value: 'yyy' },
 *   city: { key: 'xxx', value: 'yyy' },
 *   area: { key: 'xxx', value: 'yyy' },
 *   town: { key: 'xxx', value: 'yyy' }
 * }
 *
 * @export
 *
 * @param {object} model
 * @param {array} levels
 *
 * @returns {object} region raw data
 */
export function getRegionByModel (model, levels) {
  const region = {
    province: null,
    city: null,
    area: null,
    town: null
  }
  
  const inLevel = key => levels.some(val => val === key)

  if (!model.province) return region

  region.province = getDetail(model.province)

  if (!model.city || !inLevel(CITY_KEY) || !region.province) return region

  region.city = getDetail(model.city)

  if (!model.area || !inLevel(AREA_KEY) || !region.city) return region

  region.area = getDetail(model.area)

  if (!model.town || !inLevel(TOWN_KEY) || !region.area) return region

  const towns = loadTown(region.area)
  if (towns.length) {
    region.town = towns.find(val => val.key === model.town)
  }

  return region
}
