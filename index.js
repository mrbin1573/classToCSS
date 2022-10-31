const vscode = require("vscode")
const renderCSS2File = require("./modules/renderCSS2File")

async function activate() {
  vscode.workspace.onDidSaveTextDocument(renderCSS2File)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
