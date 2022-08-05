const { Uri, workspace } = require("vscode")
const { GOLBAL_FILE_NAME, APPLY_FILE_NAME, APPLY_HEAD_DES } = require("./config")

/**
 * @description: String转uint8array
 * @param {*} str
 * @return {Uint8Array} Uint8Array
 */
const stringToUint8Array = (str) => {
  const buffer = []
  for (let i of str) {
    const _code = i.charCodeAt(0)
    if (_code < 0x80) {
      buffer.push(_code)
    } else if (_code < 0x800) {
      buffer.push(0xc0 + (_code >> 6))
      buffer.push(0x80 + (_code & 0x3f))
    } else if (_code < 0x10000) {
      buffer.push(0xe0 + (_code >> 12))
      buffer.push(0x80 + ((_code >> 6) & 0x3f))
      buffer.push(0x80 + (_code & 0x3f))
    }
  }
  return Uint8Array.from(buffer)
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
  const fileUri = Uri.file(pullPath)
  workspace.fs.writeFile(fileUri, stringToUint8Array(string))
}

/**
 * @description: 自动判断并引入生成的classToCss.css到index.html
 */
const autoLinkCSSFile = () => {
  workspace.findFiles("index.html", "**​/node_modules/**", 1).then(async (res) => {
    if (!res.length) return
    const { fsPath } = res[0]
    let text = await getTextFromFilePath(fsPath, true)
    const insertLinkStr = `<link rel="stylesheet" href="/${GOLBAL_FILE_NAME}"`
    const hasInserted = text.includes(insertLinkStr)

    if (hasInserted) return

    text = text.replace("</head>", `  ${insertLinkStr}/>\n</head>`)
    writeStringToPath(text, fsPath)
  })
}

/**
 * @description: 字符串是不是纯数字
 * @param {*} string
 * @return {*}
 */
const isNumberStr = (string) => !Number.isNaN(Number(string))

/**
 * @description: 包含特殊符号className的转换
 * @param {String} string
 * @return {String} className 如color-#fff => color-\#fff
 */
const toSpecialStr = (string) => {
  const specialReg = /([\[\]\%\.\(\)\#\s])/

  const isSpecailStr = specialReg.test(string)
  if (!isSpecailStr) return string

  const stringAry = string.split("")
  const result = stringAry.reduce((acc, cur) => {
    const _isSpecial = specialReg.test(cur)
    _isSpecial
      ? cur.replace(specialReg, ($0, $1) => {
          acc += cur.replace($1, `\\${$1}`)
        })
      : (acc += cur)

    return acc
  }, "")

  return result
}

/**
 * @description: 生成apply文件
 */
const addApplyFile = () => {
  writeStringToPath(APPLY_HEAD_DES, workspace.workspaceFolders[0].uri.fsPath + "/" + APPLY_FILE_NAME)
}

module.exports = {
  stringToUint8Array,
  uint8ArrayToString,
  getTextFromFilePath,
  writeStringToPath,
  isNumberStr,
  autoLinkCSSFile,
  toSpecialStr,
  addApplyFile,
}
