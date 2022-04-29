const vscode = require("vscode")
const renderCSS = require("./modules/renderCSS")

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  renderCSS()

  vscode.workspace.onDidSaveTextDocument(() => {
    renderCSS()
  })
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
