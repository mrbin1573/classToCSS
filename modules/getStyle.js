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
    const isMinus = className.lastIndexOf("--") > -1
    const spliteIndex = isMinus ? className.lastIndexOf("--") : className.lastIndexOf("-")

    let classValue, classKey
    if (spliteIndex > -1) classValue = className.slice(spliteIndex + 1)
    classKey = className.slice(0, spliteIndex)

    // 优先匹配全名
    let mapInfo = classMap.get(className)
    if (!mapInfo) mapInfo = classMap.get(classKey)
    if (!mapInfo) return allStyle

    const { styleName, preStyle, hasUnit, valType, valueWrapper, willRatio, unit: localUnit, accept: acceptRegAry } = mapInfo
    const isCValue = valType === "classValue"
    const isPercent = valType === "percent"
    const isCName = valType === "classFullName"
    const isBracket = valType === "bracket"
    const isFull = valType === "full"

    if (isCValue && !classValue) return allStyle // isCValue classValue-没有值
    if (!styleName) return (allStyle += `.${className} { ${preStyle ? preStyle : ""}}\n`) // styleName没配置，但是有前置style, 如truncate

    // xx-[xx]自定义值，直接编译
    const customReg = /^\[(.+)\]$/gim
    const isCustomValue = customReg.test(classValue)
    if (isCustomValue) {
      customReg.lastIndex = 0
      const _cusVal = customReg.exec(classValue)
      className = className.replace("[", "\\[").replace("]", "\\]").replace("%", "\\%").replace(".", "\\.").replace("(", "\\(").replace(")", "\\)")
      allStyle += `.${className} { ${preStyle ? preStyle : ""}${styleName}: ${_cusVal[1]}; }\n`
      return allStyle
    }

    let styleValue = ((isCValue || isPercent || isBracket) && classValue) || (isCName && className)
    if (acceptRegAry.every((reg) => !reg.test(styleValue))) return allStyle // 校验
    valueWrapper && (styleValue = valueWrapper[classValue] || classValue) // 值需要再次转换
    willRatio && isNumberStr(styleValue) && (styleValue *= valueRatio)
    isPercent && (styleValue = styleValue / 100)
    isFull && (styleValue = "100%")
    isBracket && (styleValue = `${classKey}(${classValue})`)

    if (hasUnit) {
      isBracket ? (styleValue = styleValue.replace(")", `${localUnit || unit})`)) /**括号中添加单位 */ : (styleValue += localUnit || unit)
    }

    if (/#/.test(className)) className = className.replace(/#/, "\\#") // 类似 color-#dedede => .color-\#dedede { xxx }
    // if (/%/.test(className)) className = className.replace(/%/, "\\%") // 类似 w-50% => .w-50\% { xxx }
    allStyle += `.${className} { ${preStyle ? preStyle : ""}${styleName}: ${styleValue}; }\n`

    return allStyle
  }, "")
}

module.exports = getStyle
