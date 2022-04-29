const { window } = require("vscode")

// 检测的文件类型
const acceptLangIds = ["html", "javascript", "vue"]
const workspaceCSSCatch = new Map() // 所有文件的css缓存

/**
 * @description: 获取工作区的class数组
 * @return {Array} 去重的class数组
 */
function getWorkspaceCSSAry() {
  const editor = window.activeTextEditor
  const activeDoc = editor.document
  const text = activeDoc.getText()
  const { languageId, fileName } = activeDoc

  if (!acceptLangIds.some((item) => item === languageId)) return []
  if (!text) return []

  const classReg = /class=['|"]([\w+\d\-\s\#\.\%\!]+)['|"]?/gmi
  let classStr = []
  text.replace(classReg, ($0, $1) => {
    classStr.push($1)
  })

  let classAry = classStr.map((str) => str.split(/\s+/g)).flat()
  classAry = [...new Set(classAry)] // 当前编辑区去重

  workspaceCSSCatch.set(fileName, classAry)

  // 文件间交叉去重
  const resSet = new Set()
  for (const [_, _classAry] of workspaceCSSCatch) {
    _classAry.forEach((className) => resSet.add(className))
  }

  return [...resSet]
}

module.exports = getWorkspaceCSSAry
