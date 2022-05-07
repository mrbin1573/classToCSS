const { generateCSSFileName } = require("./config")
const { getTextFromFilePath } = require("./utils")
/**
 * @description: 获取工作区上次的className数组
 * @return {Promise} className数组，无文件返回[]
 */
const getLastCSSAry = async () =>
  new Promise(async (resolve, reject) => {
    const res = []
    try {
      const lastCSS = await getTextFromFilePath("\\" + generateCSSFileName)
      const classReg = /\.(\w+\-*\S*)/gim
      lastCSS.replace(classReg, ($0, $1) => {
        res.push($1)
      })
    } catch (error) {}

    resolve(res)
  })

module.exports = getLastCSSAry
