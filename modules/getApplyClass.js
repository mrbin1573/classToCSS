const { APPLY_FILE_NAME } = require("./config")
const { getTextFromFilePath, addApplyFile } = require("./utils")

const getApplyClass = async () => {
  let applyListAry = []
  try {
    const applyTxt = await getTextFromFilePath("\\" + APPLY_FILE_NAME)
    const dividerReg = /\.(\S+)\s*\{\n*\s*@apply\s*(.*)\;/gim
    applyTxt.replace(dividerReg, ($0, $1, $2) => {
      let _classList = $2.split(/\s+/).map((item) => item.split(".")[1])
      applyListAry.push({ className: $1, classList: _classList })
    })
  } catch ({ code }) {
    const noFile = code === "FileNotFound"
    noFile && addApplyFile()
  }

  return applyListAry
}

module.exports = getApplyClass
