/**
 * 手机号验证
 * @param {手机号} str 
 */
export function isMobile(str) {
  const re = /^1\d{10}$/
  return re.test(str)
}