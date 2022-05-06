const { window } = require("vscode")
const classMap = require("./classMap")

// 检测的文件类型
const workspaceCSSCatch = new Map() // 所有文件的css缓存

/**
 * @description: 获取工作区的class数组
 * @return {Array} 去重的class数组
 */
function getWorkspaceCSSAry() {
  const editor = window.activeTextEditor

  if (!editor) return []

  const activeDoc = editor.document
  const text = activeDoc.getText()
  const { fileName } = activeDoc

  if (!text) return []

  const classReg = /class=['|"]([\w+\d\-*\s\#\.\%]+)['|"]?/gim
  let classStr = []
  text.replace(classReg, ($0, $1) => {
    classStr.push($1)
  })

  
  // TODO无效值不编译
  
  let classAry = classStr.map((str) => str.split(/\s+/g)).flat()
  
  // 当前编辑区和文件间交叉去重
  workspaceCSSCatch.set(fileName, classAry)
  const resSet = new Set()
  for (const [_, _classAry] of workspaceCSSCatch) {
    _classAry.forEach((className) => resSet.add(className))
  }

  return [...resSet]
}

module.exports = getWorkspaceCSSAry
