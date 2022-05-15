const { window } = require("vscode")

const workspaceCSSCatch = new Map() // 所有文件的css缓存

/**
 * @description: 获取工作区的class数组
 * @return {Array} 去重的class数组
 */
function getWorkspaceClassAry() {
  const editor = window.activeTextEditor

  if (!editor) return []

  const activeDoc = editor.document
  const text = activeDoc.getText()
  const { fileName } = activeDoc

  if (!text) return []

  const classReg = /class=(['|"])(.+)\1/gim // \1 表示第一个组匹配内容，不会出现匹配到'xxx"
  let classStr = []
  text.replace(classReg, ($0, $1, $2) => {
    classStr.push($2)
  })

  let classAry = classStr.map((str) => str.split(/\s+/g)).flat()

  // 当前编辑区和文件间交叉去重
  workspaceCSSCatch.set(fileName, classAry)
  const resSet = new Set()
  for (const [_, _classAry] of workspaceCSSCatch) {
    _classAry.forEach((className) => resSet.add(className))
  }

  return [...resSet]
}

module.exports = getWorkspaceClassAry
