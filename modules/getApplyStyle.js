const className2style = require("./className2style")
const { toSpecialStr } = require("./utils")

/**
 * @description: 生成apply的style样式
 * @param {Array} classAry className数组
 * @return {Promise} css
 */
const getApplyStyle = async (classAry) => {
  let allStyle = "/* apply result */\n"
  for (let index = 0; index < classAry.length; index++) {
    const { className, classList } = classAry[index]

    let acc = { style: "", isolateStyle: "\n" }
    for (let idx = 0; idx < classList.length; idx++) {
      const curName = classList[idx]
      const { style, isolateStyle } = await className2style(curName)
      acc.style += style + " "
      acc.isolateStyle += isolateStyle || ""
    }

    allStyle += `.${toSpecialStr(className)} { ${acc.style} }${acc.isolateStyle}`
  }

  return allStyle
}

module.exports = getApplyStyle
