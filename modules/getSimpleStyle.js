const className2style = require("./className2style")
const { toSpecialStr } = require("./utils")

/**
 * @description: 生成style样式
 * @param {Array} classAry className数组
 * @return {String} css
 */
const IMPT_REG = /-{1}important$/gim
const getSimpleStyle = async (classAry) => {
  let importantIdxList = [] // 缓存important的index
  let allStyle = await Promise.all(
    classAry.map((className, index) => {
      const isImportant = IMPT_REG.test(className)
      if (isImportant) {
        className = className.split(IMPT_REG)[0]
        importantIdxList.push(index)
      }

      return className2style(className)
    })
  )
  allStyle = allStyle.reduce((_allStyle, curStyle, curIdx) => {
    if (!curStyle) return _allStyle

    let _className = classAry[curIdx]
    let _css = `.${toSpecialStr(_className)} { ${curStyle} }\n`

    const isImportant = importantIdxList.includes(curIdx)
    if (isImportant) _css = _css.replace(/;/gim, " !important;")

    return _allStyle + _css
  }, "")

  return allStyle
}

module.exports = getSimpleStyle
