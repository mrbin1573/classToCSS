const { Uri, workspace } = require("vscode")

/**
 * @description: String转uint8array
 * @param {*} str
 * @return {Uint8Array} Uint8Array
 */
const stringToUint8Array = (str) => {
  var arr = []
  for (var i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i))
  }

  return new Uint8Array(arr)
}

/**
 * @description: text转uint8array
 * @param {Uint8Array} fileData
 * @return {String} String
 */
const uint8ArrayToString = (fileData) => fileData.reduce((str, cur) => (str += String.fromCharCode(cur)), "")

/**
 * @description: 读取路径文件内容
 * @param {String} path 根目录的相对路径
 * @param {Boolean} isFullPath 是不是完整路径
 * @return {Promise} Promise text
 */
const getTextFromFilePath = (path, isFullPath = false) => {
  return new Promise((resolve, reject) => {
    const uri = Uri.file(isFullPath ? path : workspace.workspaceFolders[0].uri.fsPath + path)
    workspace.fs.readFile(uri).then(
      (uint8ary) => {
        resolve(uint8ArrayToString(uint8ary))
      },
      (reason) => {
        reject(reason)
      }
    )
  })
}

/**
 * @description: 写文本到路径下的文件(全覆盖)
 * @param {String} string
 * @param {String} pullPath
 */
const writeStringToPath = (string, pullPath) => {
  const fileUri = Uri.file(pullPath || workspace.workspaceFolders[0].uri.fsPath + "\\classToCSS.css")
  workspace.fs.writeFile(fileUri, stringToUint8Array(string))
}

/**
 * @description: 自动判断并引入生成的classToCss.css
 */
const autoLinkCSSFile = () => {
  workspace.findFiles("index.html", "**​/node_modules/**", 1).then(async (res) => {
    if (!res.length) return
    const { fsPath } = res[0]
    let text = await getTextFromFilePath(fsPath, true)
    const insertLinkStr = '<link rel="stylesheet" href="/classToCss.css">'
    const hasInserted = text.includes(insertLinkStr)

    if (hasInserted) return

    text = text.replace("</head>", `    ${insertLinkStr}`)
    writeStringToPath(text, fsPath)
  })
}

module.exports = {
  stringToUint8Array,
  uint8ArrayToString,
  getTextFromFilePath,
  writeStringToPath,
  autoLinkCSSFile,
}
