/**
 * 返回一个数字，其值限制在给定范围内
 * 例如：将此计算的输出限制为0到255之间 ：(x * 255).clamp(0, 255)
 *
 * @param {Number} input
 * @param {Number} min 输出范围的下限
 * @param {Number} max 输出范围的上限
 * @returns 范围是[min，max]的数字
 * @type Number
 */
export function clamp(input = 0, min = 0, max = 255) {
  return Math.min(Math.max(input, min), max);
}

export default { clamp };
