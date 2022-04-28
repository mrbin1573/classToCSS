const flexMap = require("./classMap")
const classMap = require("./classMap")
const { suffix, ratio } = require("./config")
const allStyleCatch = new Set()

const getStyle = (classAry) => {
  return classAry.reduce((acc, cur) => {
    const [key, classValue] = cur.split("-")
    const cssName = `${key}${classValue ? `-${classValue}` : ""}`
    const mapInfo = classMap[key]

    if (!mapInfo) return acc
    
    const { styleName, valuePrefix /** style值的前缀 */, hasSuffix /**后缀单位[px] */, valueType } = mapInfo
    const isClassValue = valueType === "value" // 直接取class中-后面的值
    const isKeyValue = valueType === "key" // 直接取class中-前面的值

    let styleValue = (isClassValue && classValue) || (isKeyValue && key)
    !isNaN(styleValue) && (styleValue *= ratio) // 倍数
    hasSuffix && (styleValue += suffix) // 后缀单位
    acc += `.${cssName} { ${styleName}: ${valuePrefix ? valuePrefix : ""}${styleValue}; }\n`

    return acc
  }, "")
}

module.exports = getStyle
