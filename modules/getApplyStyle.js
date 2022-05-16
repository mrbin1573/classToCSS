const className2style = require("./className2style")
const { toSpecialStr } = require("./utils")

/**
 * @description: 生成apply的style样式
 * @param {Array} classAry className数组
 * @return {String} css
 */
const getApplyStyle = (classAry) => {
  return classAry.reduce((allStyle, { className, classList }) => {
    const res = classList.reduce(
      (acc, curName) => {
        const { style, isolateStyle } = className2style(curName)
        acc.style += style
        acc.isolateStyle += isolateStyle

        return acc
      },
      { style: "", isolateStyle: "\n" }
    )

    return (allStyle += `.${toSpecialStr(className)} { ${res.style} }${res.isolateStyle}`)
  }, "/* apply result */\n")
}

module.exports = getApplyStyle
