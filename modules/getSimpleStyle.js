const className2style = require("./className2style")
const { toSpecialStr } = require("./utils")

/**
 * @description: 生成style样式
 * @param {Array} classAry className数组
 * @return {Promise} css
 */
const getSimpleStyle = async (classAry) => {
  let allStyle = await Promise.all(classAry.map((className) => className2style(className)))
  allStyle = allStyle.reduce((_allStyle, curStyle, curIdx) => {
    if (!curStyle) return _allStyle
    
    let _className = classAry[curIdx]
    const _css = `.${toSpecialStr(_className)} { ${curStyle} }\n`

    return _allStyle + _css
  }, "")

  return allStyle
}

module.exports = getSimpleStyle
