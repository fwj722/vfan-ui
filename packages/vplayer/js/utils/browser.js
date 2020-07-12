/**
 * 浏览器嗅探
 * 确定访问者使用的网页浏览器，并满足和兼容该浏览器的一些业务需要
 */
const browser = {
  isIE: /* @cc_on!@ */ false || !!document.documentMode,
  isEdge: window.navigator.userAgent.includes('Edge'),
  isWebkit: 'WebkitAppearance' in document.documentElement.style && !/Edge/.test(navigator.userAgent),
  isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
  isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform),
};

export default browser;
