/**
 * @description: 从字符串中提取class内容
 * @param {String} text
 * @return {Array} 去重的class数组
 */
function getClassAry(text) {
  const classReg = /class=['|"]([\w+\d\-\s\#]+)['|"]?/g
  let classList = []
  text.replace(classReg, function ($0, $1) {
    classList.push($1)
  })

  classList = classList.map((item) => item.split(" ")).flat()
  return [...new Set(classList)]
}

module.exports = getClassAry
