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
     * 若无再匹配key
     * 若都无，则不合规则
     */
    let [, key, classValue] = params
    let mapInfo = classMap.get(className)
    if (!mapInfo) mapInfo = classMap.get(key)
    if (!mapInfo) return allStyle

    const { styleName, preStyle, hasUnit, valType, valueMapper } = mapInfo
    const isCValue = valType === "classNameValue" // class="xx-value"
    const isCKey = valType === "classNameKey" // class="key-xx"
    const isCPercent = valType === "percent" // class="xx-value" => value/100
    const isCName = valType === "className" // class='value'
    const isFull = classValue === "full" // class='value'
    valueMapper && (classValue = valueMapper[classValue] || classValue)

    let styleValue
    if (isFull) {
      styleValue = "100%"
    } else {
      styleValue = (isCValue && classValue) || (isCKey && key) || (isCPercent && +classValue / 100) || (isCName && className)
      isCValue && isNumberStr(styleValue) && (styleValue *= valueRatio) // 取xx-value数字值的进行缩放
      hasUnit && (styleValue += unit) // 后缀单位
    }

    allStyle += `.${className} { ${preStyle ? preStyle : ""}${styleName}: ${styleValue}; }\n`

    return allStyle
  }, "")
}

module.exports = getStyle
