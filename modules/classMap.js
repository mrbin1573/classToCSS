/**
 * [name: xx, {xxxxx}]
 *    - name snippets：触发关键词
 *      styleName 生成的style
 *        valType
 *          - classNameValue     class="xx-value"
 *          - percent   value/100
 *          - className class="value"
 *          - classBracketValue class="key-value" => key(value) 如rotate-60 => rotate(60deg)
 *    valueMapper 如有，则取值的按此匹配
 *    willRatio valueRatio生效的项
 *    hasUnit 是否有单位后缀，对应config.unit
 *    placeholder snippets：enter后聚焦的提示内容
 *    accept 校验
 */
const NUMBER_REG = /^\d+$/ // 数字
const HUNDRED_REG = /^[1-9]{1}0{2}$/ // 100~900
const STRING_REG = /\D+/ // 非数字的字符串
const classMap = new Map([
  ["m", { styleName: "margin", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["mt", { styleName: "margin-top", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["mr", { styleName: "margin-right", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["mb", { styleName: "margin-bottom", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["ml", { styleName: "margin-left", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],

  ["w", { styleName: "width", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["h", { styleName: "height", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],

  ["p", { styleName: "padding", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["pt", { styleName: "padding-top", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["pr", { styleName: "padding-right", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["pb", { styleName: "padding-bottom", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["pl", { styleName: "padding-left", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],

  ["top", { styleName: "top", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["right", { styleName: "right", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["bottom", { styleName: "bottom", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["left", { styleName: "left", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],

  ["static", { styleName: "position", valType: "className", placeholder: "", accept: [STRING_REG] }],
  ["relative", { styleName: "position", valType: "className", placeholder: "", accept: [STRING_REG] }],
  ["absolute", { styleName: "position", valType: "className", placeholder: "", accept: [STRING_REG] }],
  ["sticky", { styleName: "position", valType: "className", placeholder: "", accept: [STRING_REG] }],
  ["fixed", { styleName: "position", valType: "className", placeholder: "", accept: [STRING_REG] }],

  ["inline", { styleName: "display", valType: "className", placeholder: "", accept: [STRING_REG] }],
  ["inline-block", { styleName: "display", valType: "className", placeholder: "", accept: [STRING_REG] }],
  ["block", { styleName: "display", valType: "className", placeholder: "", accept: [STRING_REG] }],
  ["flex", { styleName: "display", valType: "className", placeholder: "", accept: [STRING_REG] }],

  [
    "justify",
    {
      styleName: "justify-content",
      preStyle: "display: flex; ",
      valType: "classNameValue",
      valueMapper: { start: "flex-start", end: "flex-end", between: "space-between", around: "space-around", evenly: "space-evenly" },
      placeholder: "|",
      accept: [STRING_REG],
    },
  ],
  ["align", { styleName: "align-items", preStyle: "display: flex; ", valType: "classNameValue", placeholder: "|", accept: [STRING_REG] }],
  ["flex-row", { styleName: "flex-direction", preStyle: "display: flex; ", valType: "classNameValue", placeholder: "|", accept: [STRING_REG] }],
  ["flex-column", { styleName: "flex-direction", preStyle: "display: flex; ", valType: "classNameValue", placeholder: "|", accept: [STRING_REG] }],
  ["flex-wrap", { styleName: "flex-wrap", preStyle: "display: flex; ", valType: "classNameValue", placeholder: "|", accept: [STRING_REG] }],

  [
    "radius",
    { styleName: "border-radius", hasUnit: true, willRatio: true, preStyle: "overflow: hidden; ", valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] },
  ],

  ["fs", { styleName: "font-size", hasUnit: true, willRatio: true, valType: "classNameValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["fw", { styleName: "font-weight", valType: "classNameValue", placeholder: "number|string", accept: [HUNDRED_REG, STRING_REG] }],
  ["fm", { styleName: "font-family", valType: "classNameValue", placeholder: "string", accept: [STRING_REG] }],
  ["color", { styleName: "color", valType: "classNameValue", placeholder: "string", accept: [STRING_REG] }],

  ["bgcolor", { styleName: "background-color", valType: "classNameValue", placeholder: "string", accept: [STRING_REG] }],

  ["opacity", { styleName: "opacity", valType: "percent", placeholder: "0~100", accept: [NUMBER_REG] }],
  ["transition", { styleName: "transition", valType: "classNameValue", hasUnit: true, unit: "ms", placeholder: "ms", accept: [NUMBER_REG] }],

  ["rotate", { styleName: "transform", valType: "classBracketValue", hasUnit: true, unit: "deg", placeholder: "deg", accept: [NUMBER_REG] }],
  ["translateX", { styleName: "transform", valType: "classBracketValue", hasUnit: true, placeholder: "number", accept: [NUMBER_REG] }],
  ["scale", { styleName: "transform", valType: "classBracketValue", placeholder: "number", accept: [NUMBER_REG] }],

  ["border-box", { styleName: "box-sizing", valType: "className", placeholder: "", accept: [STRING_REG] }],
  ["content-box", { styleName: "box-sizing", valType: "className", placeholder: "", accept: [STRING_REG] }],
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

  console.log("snippets.json=====>", JSON.stringify(jsonObj))
}
// generateSnippetsJSON() // 需要生成提示时，执行一下，在【调试控制台】查看结果

module.exports = classMap
