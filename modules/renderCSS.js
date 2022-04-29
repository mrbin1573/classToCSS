const vscode = require("vscode")
const getWorkspaceCSSAry = require("./getWorkspaceCSSAry.js")
const getStyle = require("./getStyle.js")
const { stringToUint8Array, writeStringToPath } = require("./utils.js")
const getLastCSSAry = require("./getLastCSSAry.js")
let lastClsssNamAry = []

/**
 * @description: 渲染css到文件
 * @param {*} renderLast 是否渲染上次工作区的数据（如果有）
 */
const renderCSS = async (renderLast = false) => {
  let classAry = getWorkspaceCSSAry()
  if (!classAry.length) return

  if (!lastClsssNamAry.length) lastClsssNamAry = await getLastCSSAry()

  classAry = [...new Set([...lastClsssNamAry, ...classAry])]

  const styles = getStyle(classAry)

  // 写入当前文件
  // editor.edit((TextEditorEdit) => {
  //   TextEditorEdit.insert(new vscode.Position(lineCount, 0), `\n<style>\n${styles}</style>`)
  // })

  writeStringToPath(styles, vscode.workspace.workspaceFolders[0].uri.fsPath + "\\classToCSS.css")
}

module.exports = renderCSS
