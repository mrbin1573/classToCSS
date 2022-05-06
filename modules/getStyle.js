const { workspace } = require("vscode")
const classMap = require("./classMap")
const { isNumberStr } = require("./utils")

/**
 * @description: 生成style样式
 * @param {Array} classAry className数组
 * @return {String} css
 */
const getStyle = (classAry) => {
  const { unit, valueRatio } = workspace.getConfiguration("classtocss")
  return classAry.reduce((allStyle, className) => {
    const params = /(\w+)\-?(.*)/gi.exec(className)
    if (!params) return allStyle
    /**
     * className全名匹配
     * 若无再匹配classKey
     * 若都无，则不合规则
     */
    let [, classKey, classValue] = params
    let mapInfo = classMap.get(className)
    if (!mapInfo) mapInfo = classMap.get(classKey)
    if (!mapInfo) return allStyle

    const { styleName, preStyle, hasUnit, valType, valueMapper, willRatio, unit: localUnit } = mapInfo
    const isCNValue = valType === "classNameValue"
    const isCPercent = valType === "percent"
    const isCName = valType === "className"
    const isBracket = valType === "classBracketValue"
    const isFull = classValue === "full"
    valueMapper && (classValue = valueMapper[classValue] || classValue) // 值需要再次转换

    let styleValue
    if (isFull) {
      styleValue = "100%"
    } else {
      styleValue =
        (isCNValue && classValue) ||
        (isCPercent && +classValue / 100) ||
        (isCName && className) ||
        (isBracket && `${classKey}(${classValue})`)
      willRatio && isNumberStr(styleValue) && (styleValue *= valueRatio)
      if (hasUnit) {
        isBracket
          ? (styleValue = styleValue.replace(")", `${localUnit || unit})`)) /**括号中添加单位 */
          : (styleValue += localUnit || unit)
      }
    }

    allStyle += `.${className} { ${preStyle ? preStyle : ""}${styleName}: ${styleValue}; }\n`

    return allStyle
  }, "")
}

module.exports = getStyle
