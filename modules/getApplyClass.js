const { applyFileName } = require("./config")
const { getTextFromFilePath } = require("./utils")

const getApplyClass = async () => {
  const applyTxt = await getTextFromFilePath("\\" + applyFileName)
  const dividerReg = /\.(\w+)\s*\{\n*\s*@apply\s*(.*)\;/gim
  let applyListAry = []
  applyTxt.replace(dividerReg, ($0, $1, $2) => {
    let _classList = $2.split(/\s+/).map((item) => item.split(".")[1])
    applyListAry.push({ className: $1, classList: _classList })
  })

  return applyListAry
}

module.exports = getApplyClass
