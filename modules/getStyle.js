const flexMap = require("./classMap")
const classMap = require("./classMap")
const { suffix, ratio } = require("./config")

const getStyle = (classAry) => {
  return classAry.reduce((acc, cur) => {
    const [key, classValue] = cur.split("-")
    const cssName = `${key}${classValue ? `-${classValue}` : ""}`
    const { styleName, valuePrefix /** style值的前缀 */, hasSuffix /**后缀单位[px] */, valueType } = classMap[key]
    const isClassValue = valueType === "value" // 直接取class中-后面的值
    const isKeyValue = valueType === "key" // 直接取class中-前面的值

    let styleValue = (isClassValue && classValue) || (isKeyValue && key)
    !isNaN(styleValue) && (styleValue *= ratio) // 倍数
    hasSuffix && (styleValue += suffix) // 后缀单位
    acc += `.${cssName} {\n  ${styleName}: ${valuePrefix ? valuePrefix : ""}${styleValue}; \n}\n`

    return acc
  }, "")
}

module.exports = getStyle
