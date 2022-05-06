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
// TODO accept
const classMap = new Map([
  [
    "m",
    {
      styleName: "margin",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "mt",
    {
      styleName: "margin-top",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "mr",
    {
      styleName: "margin-right",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "mb",
    {
      styleName: "margin-bottom",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "ml",
    {
      styleName: "margin-left",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],

  [
    "w",
    {
      styleName: "width",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "h",
    {
      styleName: "height",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],

  [
    "p",
    {
      styleName: "padding",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "pt",
    {
      styleName: "padding-top",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "pr",
    {
      styleName: "padding-right",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "pb",
    {
      styleName: "padding-bottom",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "pl",
    {
      styleName: "padding-left",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],

  [
    "top",
    {
      styleName: "top",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "right",
    {
      styleName: "right",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "bottom",
    {
      styleName: "bottom",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "left",
    {
      styleName: "left",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],

  ["static", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],
  ["relative", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],
  ["absolute", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],
  ["sticky", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],
  ["fixed", { styleName: "position", valType: "className", placeholder: "", accept: [String] }],

  ["inline", { styleName: "display", valType: "className", placeholder: "", accept: [String] }],
  ["inline-block", { styleName: "display", valType: "className", placeholder: "", accept: [String] }],
  ["block", { styleName: "display", valType: "className", placeholder: "", accept: [String] }],
  ["flex", { styleName: "display", valType: "className", placeholder: "", accept: [String] }],

  [
    "justify",
    {
      styleName: "justify-content",
      preStyle: "display: flex; ",
      valType: "classNameValue",
      valueMapper: {
        start: "flex-start",
        end: "flex-end",
        between: "space-between",
        around: "space-around",
        evenly: "space-evenly",
      },
      placeholder: "|",
      accept: [String],
    },
  ],
  [
    "align",
    {
      styleName: "align-items",
      preStyle: "display: flex; ",
      valType: "classNameValue",
      placeholder: "|",
      accept: [String],
    },
  ],
  [
    "flex-row",
    {
      styleName: "flex-direction",
      preStyle: "display: flex; ",
      valType: "classNameValue",
      placeholder: "|",
      accept: [String],
    },
  ],
  [
    "flex-column",
    {
      styleName: "flex-direction",
      preStyle: "display: flex; ",
      valType: "classNameValue",
      placeholder: "|",
      accept: [String],
    },
  ],
  [
    "flex-wrap",
    {
      styleName: "flex-wrap",
      preStyle: "display: flex; ",
      valType: "classNameValue",
      placeholder: "|",
      accept: [String],
    },
  ],

  [
    "radius",
    {
      styleName: "border-radius",
      hasUnit: true,
      willRatio: true,
      preStyle: "overflow: hidden; ",
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],

  [
    "fs",
    {
      styleName: "font-size",
      hasUnit: true,
      willRatio: true,
      valType: "classNameValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "fw",
    { styleName: "font-weight", valType: "classNameValue", placeholder: "Number|String", accept: [Number, String] },
  ],
  ["fm", { styleName: "font-family", valType: "classNameValue", placeholder: "String", accept: [String] }],
  ["color", { styleName: "color", valType: "classNameValue", placeholder: "String", accept: [String] }],

  ["bgcolor", { styleName: "background-color", valType: "classNameValue", placeholder: "String", accept: [String] }],

  ["opacity", { styleName: "opacity", valType: "percent", placeholder: "0~100", accept: [Number] }],
  [
    "transition",
    {
      styleName: "transition",
      valType: "classNameValue",
      hasUnit: true,
      unit: "ms",
      placeholder: "ms",
      accept: [Number],
    },
  ],

  [
    "rotate",
    {
      styleName: "transform",
      valType: "classBracketValue",
      hasUnit: true,
      unit: "deg",
      placeholder: "deg",
      accept: [Number],
    },
  ],
  [
    "translateX",
    {
      styleName: "transform",
      valType: "classBracketValue",
      hasUnit: true,
      placeholder: "Number",
      accept: [Number],
    },
  ],
  [
    "scale",
    {
      styleName: "transform",
      valType: "classBracketValue",
      placeholder: "Number",
      accept: [Number],
    },
  ],

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
