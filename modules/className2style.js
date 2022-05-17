const { workspace } = require("vscode")
const classMap = require("./classMap")
const { isNumberStr } = require("./utils")

/**
 * @description: className转换为style
 * @param className
 * @return {Object} {style: '', isolateStyle: '独立的不包裹在className中的style'}
 */
module.exports = function (className) {
  const { unit, valueRatio } = workspace.getConfiguration("classtocss")
  const isMinus = className.lastIndexOf("--") > -1
  const spliteIndex = isMinus ? className.lastIndexOf("--") : className.lastIndexOf("-")
  const resInfo = { style: "", isolateStyle: "" }

  let classValue, classKey
  if (spliteIndex > -1) classValue = className.slice(spliteIndex + 1)
  classKey = className.slice(0, spliteIndex)

  // 优先匹配全名
  let mapInfo = classMap.get(className)
  if (!mapInfo) mapInfo = classMap.get(classKey)
  if (!mapInfo) return resInfo

  const { styleName, preStyle, hasUnit, valType, valueWrapper, willRatio, unit: localUnit, accept: acceptRegAry, isolateStyle } = mapInfo
  resInfo.isolateStyle = isolateStyle

  const isCValue = valType === "classValue"
  const isPercent = valType === "percent"
  const isCName = valType === "classFullName"
  const isBracket = valType === "bracket"
  const isFull = classValue === "full"

  if (isCValue && !classValue) return resInfo // isCValue classValue-没有值
  if (!styleName) {
    resInfo.style = `${preStyle ? preStyle : ""}`
    return resInfo
  }
  // styleName没配置，但是有前置style, 如truncate

  // xx-[xx]自定义值，直接编译
  const customReg = /^\[(.+)\]$/gim
  const isCustomValue = customReg.test(classValue)
  if (isCustomValue) {
    customReg.lastIndex = 0
    const _cusVal = customReg.exec(classValue)
    resInfo.style = `${preStyle ? preStyle : ""}${styleName}: ${_cusVal[1]};`

    return resInfo
  }

  let styleValue = ((isCValue || isPercent || isBracket) && classValue) || (isCName && className)
  const isMultiVal = /\_/.test(styleValue)
  if (isMultiVal) {
    let values = classValue.split("_")
    values = values.map((value) => {
      if (isNumberStr(value)) {
        valueRatio && (value *= valueRatio)
        hasUnit && (value += `${localUnit || unit}`)
      }
      return value
    })

    let _value = isBracket ? `${classKey}(${values.join(", ")})` : values.join(" ")

    resInfo.style = `${preStyle ? preStyle : ""}${styleName}: ${_value};`

    return resInfo
  } else {
    if (acceptRegAry.every((reg) => !reg.test(styleValue))) return resInfo // 校验
    valueWrapper && (styleValue = valueWrapper[classValue] || classValue) // 值需要再次转换
    willRatio && isNumberStr(styleValue) && (styleValue *= valueRatio)
    isPercent && (styleValue = styleValue / 100)
    isFull && (styleValue = "100%")
    isBracket && (styleValue = `${classKey}(${classValue})`)

    if (hasUnit && !isFull) {
      isBracket ? (styleValue = styleValue.replace(")", `${localUnit || unit})`)) /**括号中添加单位 */ : (styleValue += localUnit || unit)
    }

    resInfo.style = `${preStyle ? preStyle : ""}${styleName}: ${styleValue};`

    return resInfo
  }
}
