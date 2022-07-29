const { workspace } = require("vscode")
const { classNameMapper, SEPECIAL_REG } = require("./classNameMapper")
const { LOCAL_CONF_NAME } = require("./config")
const { getTextFromFilePath } = require("./utils")

/**
 * @description: className转换为style
 * @param className
 * @return {Promise} {style: '', isolateStyle: '独立的不包裹在className中的style'}
 */
module.exports = async function (className) {
  /**
   * 处理配置项，local优先级高于全局
   */
  let localConfig
  try {
    localConfig = await getTextFromFilePath("\\" + LOCAL_CONF_NAME)
  } catch (error) {}
  if (localConfig) localConfig = JSON.parse(localConfig)
  const editorConfig = workspace.getConfiguration("classtocss")
  const totalConfig = { ...editorConfig, ...localConfig } // 后覆盖前，实现优先级
  const { unit, valueRatio } = totalConfig

  const classNameDetail = classNameMapper.find(({ matchReg }) => matchReg.test(className))

  if (!classNameDetail) return ""

  // 特殊值[]
  const specialReg = eval(`/^(${SEPECIAL_REG})$/`)
  const isSpecial = specialReg.test(className)
  let classVal
  console.log('className :>> ', className);
  if (isSpecial) {
    const values = specialReg.exec(className)[1].split("_")
    classVal = values.join(" ")
  } else {
    const { matchReg, valIndex = 1 } = classNameDetail
    classVal = matchReg.exec(className)[valIndex]
  }

  const { wrapper } = classNameDetail
  return wrapper({ val: classVal, unit, ratio: valueRatio })
}
