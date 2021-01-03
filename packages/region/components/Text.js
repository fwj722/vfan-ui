/*
 * @Description: 
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-12-02 09:19:42
 * @LastEditTime: 2020-12-02 19:35:17
 */
import data from '../mixins/data'
import method from '../mixins/method'

/**
 *仅仅展示文本，不进行任何交互操作
 */
export default {
  name: 'VTextRegion',
  mixins: [data, method],
  inheritAttrs: false,
  render () {
  return (<span>{ this.selectedText }</span>)
  }
}
