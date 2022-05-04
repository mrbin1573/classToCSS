const vscode = require("vscode")
const renderCSS2File = require("./modules/renderCSS2File")
const { autoLinkCSSFile } = require("./modules/utils")

// TODO 修改老编辑区class不刷新classToFile.css
async function activate() {
  renderCSS2File()

  autoLinkCSSFile()

  vscode.workspace.onDidSaveTextDocument(() => {
    renderCSS2File()
  })
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
