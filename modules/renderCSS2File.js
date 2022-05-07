const vscode = require("vscode")
const getWorkspaceCSSAry = require("./getWorkspaceCSSAry.js")
const getStyle = require("./getStyle.js")
const { writeStringToPath } = require("./utils.js")
const getLastCSSAry = require("./getLastCSSAry.js")
const { generateCSSFileName } = require("./config.js")
let lastClsssNamAry = []

/**
 * @description: 渲染css到文件
 * @param {*} renderLast 是否渲染上次工作区的数据（如果有）
 */
const renderCSS2File = async (renderLast = false) => {
  // 编辑区的class
  let classAry = getWorkspaceCSSAry()
  if (!classAry.length) return

  // classToCSS.css已经存在的css
  if (!lastClsssNamAry.length) lastClsssNamAry = await getLastCSSAry()

  classAry = [...new Set([...lastClsssNamAry, ...classAry])]

  const styles = getStyle(classAry)

  // 写入当前文件
  // editor.edit((TextEditorEdit) => {
  //   TextEditorEdit.insert(new vscode.Position(lineCount, 0), `\n<style>\n${styles}</style>`)
  // })

  styles && writeStringToPath(styles, vscode.workspace.workspaceFolders[0].uri.fsPath + "\\" + generateCSSFileName)
}

module.exports = renderCSS2File
