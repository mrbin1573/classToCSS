const { workspace } = require("vscode")
const classMap = require("./classMap")
const { isNumberStr } = require("./utils")

/**
 * @description: className转换为style
 * @param className
 * @return {String} style
 */
module.exports = function (className) {
  const { unit, valueRatio } = workspace.getConfiguration("classtocss")
  const isMinus = className.lastIndexOf("--") > -1
  const spliteIndex = isMinus ? className.lastIndexOf("--") : className.lastIndexOf("-")

  let classValue, classKey
  if (spliteIndex > -1) classValue = className.slice(spliteIndex + 1)
  classKey = className.slice(0, spliteIndex)

  // 优先匹配全名
  let mapInfo = classMap.get(className)
  if (!mapInfo) mapInfo = classMap.get(classKey)
  if (!mapInfo) return ""

  const { styleName, preStyle, hasUnit, valType, valueWrapper, willRatio, unit: localUnit, accept: acceptRegAry } = mapInfo
  const isCValue = valType === "classValue"
  const isPercent = valType === "percent"
  const isCName = valType === "classFullName"
  const isBracket = valType === "bracket"
  const isFull = valType === "full"

  if (isCValue && !classValue) return "" // isCValue classValue-没有值
  if (!styleName) return `${preStyle ? preStyle : ""}` // styleName没配置，但是有前置style, 如truncate

  // xx-[xx]自定义值，直接编译
  const customReg = /^\[(.+)\]$/gim
  const isCustomValue = customReg.test(classValue)
  if (isCustomValue) {
    customReg.lastIndex = 0
    const _cusVal = customReg.exec(classValue)
    return `${preStyle ? preStyle : ""}${styleName}: ${_cusVal[1]};`
  }

  let styleValue = ((isCValue || isPercent || isBracket) && classValue) || (isCName && className)
  if (acceptRegAry.every((reg) => !reg.test(styleValue))) return "" // 校验
  valueWrapper && (styleValue = valueWrapper[classValue] || classValue) // 值需要再次转换
  willRatio && isNumberStr(styleValue) && (styleValue *= valueRatio)
  isPercent && (styleValue = styleValue / 100)
  isFull && (styleValue = "100%")
  isBracket && (styleValue = `${classKey}(${classValue})`)

  if (hasUnit) {
    isBracket ? (styleValue = styleValue.replace(")", `${localUnit || unit})`)) /**括号中添加单位 */ : (styleValue += localUnit || unit)
  }

  return `${preStyle ? preStyle : ""}${styleName}: ${styleValue};`
}
