const getWorkspaceClassAry = require("./getWorkspaceClassAry.js")
const getSimpleStyle = require("./getSimpleStyle.js")
const { writeStringToPath } = require("./utils.js")
const getLastClassAry = require("./getLastClassAry.js")
const { GOLBAL_FILE_NAME, GLOBAL_HEAD_DES } = require("./config.js")
const getApplyClass = require("./getApplyClass.js")
const getApplyStyle = require("./getApplyStyle.js")
const { workspace } = require("vscode")
let lastClsssNamAry = []

/**
 * @description: 渲染css到文件
 */
const renderCSS2File = async () => {
  let totalStyle = ""
  /**
   * 普通class
   */
  let totalSimpleClassAry = getWorkspaceClassAry() // 编辑区的class
  if (!lastClsssNamAry.length) lastClsssNamAry = await getLastClassAry() // classtocss_global.css历史数据
  totalSimpleClassAry = [...new Set([...lastClsssNamAry, ...totalSimpleClassAry])] // 去重
  totalSimpleClassAry.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)) // 排序
  !!totalSimpleClassAry && (totalStyle = getSimpleStyle(totalSimpleClassAry))

  // 写入当前文件
  // editor.edit((TextEditorEdit) => {
  //   TextEditorEdit.insert(new vscode.Position(lineCount, 0), `\n<style>\n${styles}</style>`)
  // })

  /**
   * apply class
   */
  const applyClassList = await getApplyClass()
  if (applyClassList.length) {
    const applyStyles = getApplyStyle(applyClassList)
    totalStyle += applyStyles
  }

  if (!totalStyle) return

  // 压缩
  const { compress } = workspace.getConfiguration("classtocss")
  compress && (totalStyle = totalStyle.replace(/[\n\r\s]+/gim, ""))

  writeStringToPath(GLOBAL_HEAD_DES + totalStyle, workspace.workspaceFolders[0].uri.fsPath + "\\" + GOLBAL_FILE_NAME)
}

module.exports = renderCSS2File
