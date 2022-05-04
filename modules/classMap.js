/**
 * [name: xx, {xxxxx}]
 *    - name snippets：触发关键词
 *      styleName 生成的style
 *        valType
 *          - key       class="key-xx"
 *          - value     class="xx-value"
 *          - percent   value/100
 *          - className class="value"
 *    hasSuffix 是否有单位后缀，对应config.suffix
 *    placeholder snippets：enter后聚焦的提示内容
 *    accept 校验
 */
// TODO accept
const classMap = new Map([
  ["m", { styleName: "margin", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["mt", { styleName: "margin-top", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["mr", { styleName: "margin-right", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["mb", { styleName: "margin-bottom", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["ml", { styleName: "margin-left", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],

  ["p", { styleName: "padding", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["pt", { styleName: "padding-top", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["pr", { styleName: "padding-right", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["pb", { styleName: "padding-bottom", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["pl", { styleName: "padding-left", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],

  ["top", { styleName: "top", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["right", { styleName: "right", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["bottom", { styleName: "bottom", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["left", { styleName: "left", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],

  ["static", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],
  ["relative", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],
  ["absolute", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],
  ["sticky", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],
  ["fixed", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],

  ["inline", { styleName: "display", valType: "className", placeholder: "", accept: [String] }],
  ["inline-block", { styleName: "display", valType: "className", placeholder: "", accept: [String] }],
  ["block", { styleName: "display", valType: "className", placeholder: "", accept: [String] }],
  ["flex", { styleName: "display", valType: "className", placeholder: "", accept: [String] }],

  ["justify", { styleName: "justify-content", prefix: "", valType: "classNameValue", placeholder: "|", accept: [String] }],
  ["align", { styleName: "align-items", valType: "classNameValue", placeholder: "|", accept: [String] }],

  ["radius", { styleName: "border-radius", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],

  ["fs", { styleName: "font-size", hasSuffix: true, valType: "classNameValue", placeholder: "Number", accept: [Number] }],
  ["fw", { styleName: "font-weight", valType: "classNameValue", placeholder: "Number|String", accept: [Number, String] }],
  ["fm", { styleName: "font-family", valType: "classNameValue", placeholder: "String", accept: [String] }],
  ["color", { styleName: "color", valType: "classNameValue", placeholder: "String", accept: [String] }],

  ["bg", { styleName: "background-color", valType: "classNameValue", placeholder: "String", accept: [String] }],

  ["opacity", { styleName: "opacity", valType: "percent", placeholder: "0~100", accept: [Number] }],
  ["transition", { styleName: "transition", valType: "percent", suffix: "ms", placeholder: "ms", accept: [Number] }],

  ["border-box", { styleName: "box-sizing", valType: "className", placeholder: "", accept: [String] }],
  ["content-box", { styleName: "box-sizing", valType: "className", placeholder: "", accept: [String] }],
])

const generateSnippetsJSON = () => {
  const jsonObj = {}
  classMap.forEach(({ styleName, valType, placeholder }, key) => {
    const isNotKeyValue = valType !== "key"
    const jsonName = isNotKeyValue ? styleName : `${styleName}-${key}`

    jsonObj[jsonName] = {
      prefix: key,
      body: `${key}${isNotKeyValue ? "-" : ""}\${0:${placeholder}}`,
    }
  })

  console.log(JSON.stringify(jsonObj))
}
// generateSnippetsJSON() // 需要生成提示时，执行一下，在【调试控制台】查看结果

module.exports = classMap
