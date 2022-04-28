const vscode = require("vscode")
const classMap = require("./classMap.js")
const getClassAry = require("./getClassAry.js")
const fs = require("fs")
const path = require("path")
const getStyle = require("./getStyle.js")
const { TextDecoder } = require("util")

// 检测的文件类型
const acceptLangIds = ["html", "javascript", "vue"]

const renderCSS = function () {
  const editor = vscode.window.activeTextEditor
  const activeDoc = editor.document
  const text = activeDoc.getText()
  console.log(activeDoc)
  const { lineCount, languageId } = activeDoc

  if (!acceptLangIds.some((item) => item === languageId)) return

  console.log("languageId=========>", languageId)
  // console.log("lineCount=========>", lineCount)
  if (!text) return

  const classAry = getClassAry(text)
  // console.log("classAry=========>", classAry)

  if (!classAry.length) return

  const styles = getStyle(classAry)
  // console.log("styles===========.", styles)

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
