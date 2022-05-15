const className2style = require("./className2style")
const { toSpecialStr } = require("./utils")

/**
 * @description: 生成style样式
 * @param {Array} classAry className数组
 * @return {String} css
 */
const getSimpleStyle = (classAry) => {
  return classAry.reduce((allStyle, className) => {
    const style = className2style(className)
    allStyle += !!style ? `.${toSpecialStr(className)} { ${style} }\n` : ""

    return allStyle
  }, "")
}

module.exports = getSimpleStyle
