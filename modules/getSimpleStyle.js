const className2style = require("./className2style")
const { toSpecialStr } = require("./utils")

/**
 * @description: 生成style样式
 * @param {Array} classAry className数组
 * @return {Promise} css
 */
const getSimpleStyle = async (classAry) => {
  let allStyle = ""
  for (let index = 0; index < classAry.length; index++) {
    const className = classAry[index]
    const { style, isolateStyle } = await className2style(className)
    if (isolateStyle) allStyle += isolateStyle + "\n"

    allStyle += !!style ? `.${toSpecialStr(className)} { ${style} } \n` : ""
  }

  return allStyle
}

module.exports = getSimpleStyle
