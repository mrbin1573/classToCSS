const vscode = require("vscode")
const classMap = require("./classMap.js")
const getClassNameAry = require("./getClassNameAry.js")
const fs = require("fs")
const path = require("path")
const getStyle = require("./getStyle.js")

// 检测的文件类型
const acceptLangIds = ["html", "javascript", "vue"]

const renderCSS = function () {
  const editor = vscode.window.activeTextEditor
  const activeDoc = editor.document
  const text = activeDoc.getText()
  const { lineCount, languageId, fileName } = activeDoc

  if (!acceptLangIds.some((item) => item === languageId)) return
  if (!text) return

  const classAry = getClassNameAry(fileName, text)
  if (!classAry.length) return
  const styles = getStyle(classAry)

  // 写入当前文件
  // editor.edit((TextEditorEdit) => {
  //   TextEditorEdit.insert(new vscode.Position(lineCount, 0), `\n<style>\n${css}</style>`)
  // })

  const wsDir = vscode.workspace.workspaceFolders[0].uri.fsPath
  fs.writeFile(path.join(wsDir, "classToCss.css"), styles, (err) => {
    if (err) {
      return vscode.window.showErrorMessage("Failed to convert class!")
    }
  })
}

module.exports = renderCSS
