const vscode = require("vscode")
const classMap = require("./classMap.js")
const getClassAry = require("./getClassAry.js")
const fs = require("fs")
const path = require("path")
const getStyle = require("./getStyle.js")

const renderCSS = function () {
  const editor = vscode.window.activeTextEditor
  const text = editor.document.getText()
  const lineCount = editor.document.lineCount

  const classAry = getClassAry(text)
  const styles = getStyle(classAry)
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
