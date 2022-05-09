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
    // /(\w+(-\w+)*)(-(\w+))?$/.exec('border-solid') // TODO 重新解析class
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

    const { styleName, preStyle, hasUnit, valType, valueMapper, willRatio, unit: localUnit, accept: acceptRegAry } = mapInfo
    const isCNValue = valType === "classNameValue"
    const isCPercent = valType === "percent"
    const isCName = valType === "className"
    const isBracket = valType === "classBracketValue"
    const isFull = classValue === "full"

    if (!styleName) return (allStyle += `.${className} { ${preStyle ? preStyle : ""}}\n`)

    valueMapper && (classValue = valueMapper[classValue] || classValue) // 值需要再次转换

    let styleValue = (isCNValue && classValue) || (isCPercent && +classValue) || (isCName && className) || (isBracket && `${classValue}`)

    // 校验
    if (acceptRegAry.every((reg) => !reg.test(styleValue))) return allStyle

    // 通过校验再处理值
    willRatio && isNumberStr(styleValue) && (styleValue *= valueRatio)
    isCPercent && (styleValue = styleValue / 100)
    isFull && (styleValue = "100%")
    isBracket && (styleValue = `${classKey}(${classValue})`)

    if (hasUnit && !isFull) {
      isBracket ? (styleValue = styleValue.replace(")", `${localUnit || unit})`)) /**括号中添加单位 */ : (styleValue += localUnit || unit)
    }

    allStyle += `.${className} { ${preStyle ? preStyle : ""}${styleName}: ${styleValue}; }\n`

    return allStyle
  }, "")
}

module.exports = getStyle
