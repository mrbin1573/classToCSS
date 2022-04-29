const vscode = require("vscode")
const renderCSS = require("./modules/renderCSS")
const { getTextFromFilePath, writeStringToPath, autoLinkCSSFile } = require("./modules/utils")

async function activate() {
  renderCSS()

  autoLinkCSSFile()

  vscode.workspace.onDidSaveTextDocument(() => {
    renderCSS()
  })
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
