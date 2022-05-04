const classMap = require("./classMap")
const { suffix, ratio } = require("./config")
const { isNumberStr } = require("./utils")

/**
 * @description: 生成style样式
 * @param {Array} classAry className数组
 * @return {String} css
 */
const getStyle = (classAry) => {
  return classAry.reduce((allStyle, className) => {
    const params = /(\w+)\-?(.*)/gi.exec(className)
    if (!params) return allStyle

    /**
     * className全名匹配
     * 若无再匹配key
     * 若都无，则不合规则
     */
    const [, key, classValue] = params
    let mapInfo = classMap.get(className)
    if (!mapInfo) mapInfo = classMap.get(key)
    if (!mapInfo) return

    const { styleName, prefix /** style值的前缀 */, hasSuffix /**后缀单位[px] */, valType } = mapInfo
    const isCValue = valType === "classNameValue" // class="xx-value"
    const isCKey = valType === "classNameKey" // class="key-xx"
    const isCPercent = valType === "percent" // class="xx-value" => value/100
    const isCName = valType === "className" // class='value'

    let styleValue =
      (isCValue && classValue) || (isCKey && key) || (isCPercent && +classValue / 100) || (isCName && className)
    isCValue && isNumberStr(styleValue) && (styleValue *= ratio) // 取xx-value数字值的进行缩放
    hasSuffix && (styleValue += suffix) // 后缀单位

    allStyle += `.${className} { ${styleName}: ${prefix ? prefix : ""}${styleValue}; }\n`

    return allStyle
  }, "")
}

module.exports = getStyle
