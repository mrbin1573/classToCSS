const className2style = require("./className2style")
const { toSpecialStr } = require("./utils")

/**
 * @description: 生成apply的style样式
 * @param {Array} classAry className数组
 * @return {String} css
 */
const getApplyStyle = (classAry) => {
  return classAry.reduce((allStyle, { className, classList }) => {
    const styles = classList.reduce((_allStyle, className) => (_allStyle += className2style(className) + " "), "")
    return (allStyle += `.${toSpecialStr(className)} { ${styles} }\n`)
  }, "/* apply result */\n")
}

module.exports = getApplyStyle
