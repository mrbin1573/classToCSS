/**
 * @description: 从字符串中提取class内容
 * @param {String} fileName 当前文件名，用以缓存数据
 * @param {String} text
 * @return {Array} 去重的class数组
 */
const fileCSSCatch = new Map()
function getClassNameAry(fileName, text) {
  const classReg = /class=['|"]([\w+\d\-\s\#\.\%]+)['|"]?/g
  let classStr = []
  text.replace(classReg, function ($0, $1) {
    classStr.push($1)
  })

  let classAry = classStr.map((str) => str.split(/\s+/g)).flat()
  classAry = [...new Set(classAry)] // 当前编辑区去重

  fileCSSCatch.set(fileName, classAry)

  // 文件间交叉去重
  const resSet = new Set()
  for (const [_, _classAry] of fileCSSCatch) {
    _classAry.forEach((className) => resSet.add(className))
  }

  return [...resSet]
}

module.exports = getClassNameAry
