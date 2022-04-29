const classMap = require("./classMap")
const { suffix, ratio } = require("./config")

/**
 * @description: 生成style样式
 * @param {Array} classAry className数组
 * @return {String} css
 */
const getStyle = (classAry) => {
  return classAry.reduce((allStyle, classStr) => {
    const params = /(\w+)\-(.*)(\!{1})?/gi.exec(classStr)

    if (!params) return allStyle

    const [, key, classValue, isImportant] = params
    const mapInfo = classMap[key]

    if (!mapInfo) return allStyle

    const { styleName, prefix /** style值的前缀 */, hasSuffix /**后缀单位[px] */, valueType } = mapInfo
    const isClassValue = valueType === "value" // class'-'后面的值
    const isKeyValue = valueType === "key" //class'-'前面的值
    const isPercent = valueType === "percent" // class'-'后面的值/100

    let styleValue = (isClassValue && classValue) || (isKeyValue && key) || (isPercent && +classValue / 100)
    isClassValue && !isNaN(styleValue) && (styleValue *= ratio) // 取xx-value数字值的进行缩放
    hasSuffix && (styleValue += suffix) // 后缀单位

    allStyle += `.${classStr} { ${styleName}: ${prefix ? prefix : ""}${styleValue}${!!isImportant ? "!important" : ""}; }\n`

    return allStyle
  }, "")
}

module.exports = getStyle
