/**
 * [name: xx, {xxxxx}]
 *    - name snippets：触发关键词
 *      styleName 生成的style
 *        valType
 *          - classValue     class="xx-value"
 *          - percent   value/100
 *          - classFullName class="xxx"
 *          - bracket class="key-value" => key(value) 如rotate-60 => rotate(60deg)
 *    valueWrapper 如有，则取值的按此匹配
 *    willRatio valueRatio生效的项
 *    hasUnit 是否有单位后缀，对应config.unit
 *    placeholder snippets：enter后聚焦的提示内容
 *    accept 校验
 */
const NUMBER_REG = /^\d+(\.{1}\d+)?$/ // 数字
const MINUS_NUMBER_REG = /^-\d+(\.{1}\d+)?$/ // 负数
const HUNDRED_REG = /^[1-9]{1}0{2}$/ // 100~900
const STRING_REG = /\D+/ // 非数字的字符串
const FULL_REG = /^full$/ // full可设置100%
const classMap = new Map([
  // Box Sizing
  ["border-box", { styleName: "box-sizing", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["content-box", { styleName: "box-sizing", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  // Display
  ["block", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["inline-block", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["inline", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["flex", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["inline-flex", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["table", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["inline-table", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["table-caption", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["table-cell", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["table-column", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["table-column-group", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["table-footer-group", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["table-header-group", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["table-row-group", { styleName: "display", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  // float
  ["float", { styleName: "float", valType: "classValue", placeholder: "left|center|right", accept: [STRING_REG] }],
  ["clear", { styleName: "clear", valType: "classValue", placeholder: "left|center|both|none", accept: [STRING_REG] }],
  // isolate
  ["isolate", { styleName: "isolation", valType: "classValue", placeholder: "", accept: [STRING_REG] }],
  ["isolation-auto", { styleName: "isolation", valType: "classValue", placeholder: "", accept: [STRING_REG] }],
  // Object Fit
  ["object", { styleName: "object-fit", valType: "classValue", placeholder: "contain|cover|fill|none|scale-down", accept: [STRING_REG] }],
  // Object Position https://www.tailwindcss.cn/docs/object-position TODO
  // 溢出
  ["overflow", { styleName: "overflow", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["overflow-x", { styleName: "overflow-x", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["overflow-y", { styleName: "overflow-y", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // Overscroll Behavior
  ["overscroll", { styleName: "overscroll", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["overscroll-x", { styleName: "overscroll-x", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["overscroll-y", { styleName: "overscroll-y", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // 定位
  ["static", { styleName: "position", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["fixed", { styleName: "position", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["absolute", { styleName: "position", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["relative", { styleName: "position", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["sticky", { styleName: "position", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  // Top / Right / Bottom / Left
  ["top", { styleName: "top", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG, FULL_REG] }],
  ["right", { styleName: "right", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG, FULL_REG] }],
  ["bottom", { styleName: "bottom", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG, FULL_REG] }],
  ["left", { styleName: "left", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG, FULL_REG] }],
  // 可见性
  ["visible", { styleName: "visibility", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["invisible", { preStyle: "visibility: hidden; ", placeholder: "", accept: [STRING_REG] }],
  // Z-Index
  ["z", { styleName: "z-index", valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  // Flex Direction
  ["flex-row", { styleName: "flex-direction", preStyle: "display: flex; ", valType: "classValue", placeholder: "", accept: [STRING_REG] }],
  ["flex-row-reverse", { styleName: "flex-direction", preStyle: "display: flex; ", valType: "classValue", valueWrapper: { reverse: "row-reverse" }, placeholder: "", accept: [STRING_REG] }],
  ["flex-col", { styleName: "flex-direction", preStyle: "display: flex; ", valType: "classValue", valueWrapper: { col: "column" }, placeholder: "", accept: [STRING_REG] }],
  ["flex-col-reverse", { styleName: "flex-direction", preStyle: "display: flex; ", valType: "classValue", valueWrapper: { "col-reserse": "column-reverse" }, placeholder: "", accept: [STRING_REG] }],
  // Flex Wrap
  ["flex-wrap", { styleName: "flex-wrap", preStyle: "display: flex; ", valType: "classValue", placeholder: "", accept: [STRING_REG] }],
  ["flex-wrap-reverse", { styleName: "flex-wrap", preStyle: "display: flex; ", valType: "classValue", placeholder: "", accept: [STRING_REG] }],
  ["flex-nowrap", { styleName: "flex-wrap", preStyle: "display: flex; ", valType: "classValue", placeholder: "", accept: [STRING_REG] }],
  // Flex
  ["flex-1", { preStyle: "flex: 1 1 0%; ", placeholder: "" }],
  ["flex-auto", { preStyle: "flex: 1 1 auto; ", placeholder: "" }],
  ["flex-initial", { preStyle: "flex: 0 1 auto; ", placeholder: "" }],
  ["flex-none", { preStyle: "flex: none; ", placeholder: "" }],
  // Flex Grow
  ["flex-grow", { styleName: "flex-grow", valType: "classValue", placeholder: "0|1", accept: [NUMBER_REG] }], // tailwindcss差异
  ["flex-grow", { preStyle: "flex-grow: 1; ", placeholder: "" }], // tailwindcss差异
  // Flex Shrink
  ["flex-shrink", { styleName: "flex-shrink", valType: "classValue", placeholder: "0|1", accept: [NUMBER_REG] }], // tailwindcss差异
  ["flex-shrink", { preStyle: "flex-shrink: 1; ", placeholder: "" }], // tailwindcss差异
  // Order
  ["order", { styleName: "order", valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }], // tailwindcss差异
  // Grid未实现
  // Gap未实现
  // Justify Content
  ["justify", { styleName: "justify-content", preStyle: "display: flex; ", valType: "classValue", valueWrapper: { start: "flex-start", end: "flex-end", between: "space-between", around: "space-around", evenly: "space-evenly" }, placeholder: "|", accept: [STRING_REG] }],
  // Justify Items
  ["justify-items", { styleName: "justify-items", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // justify-self
  ["justify-self", { styleName: "justify-self", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // Align Content
  ["align-content", { styleName: "align-content", valType: "classValue", valueWrapper: { start: "flex-start", end: "flex-end", between: "space-between", around: "space-around", evenly: "space-evenly" }, placeholder: "string", accept: [STRING_REG] }], // tailwindcss差异
  // Align Items
  ["align-items", { styleName: "align-items", valType: "classValue", valueWrapper: { start: "flex-start", end: "flex-end" }, placeholder: "string", accept: [STRING_REG] }], // tailwindcss差异
  // Align Items
  ["align-self", { styleName: "align-items", valType: "classValue", valueWrapper: { start: "flex-start", end: "flex-end" }, placeholder: "string", accept: [STRING_REG] }], // tailwindcss差异
  // Place Content
  ["place-content", { styleName: "place-content", valType: "classValue", valueWrapper: { between: "space-between", around: "space-around", evenly: "space-evenly" }, placeholder: "string", accept: [STRING_REG] }],
  // Place Items
  ["place-items", { styleName: "place-items", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // Place Self
  ["place-self", { styleName: "place-self", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // 内边距 TODO px py
  ["p", { styleName: "padding", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["pt", { styleName: "padding-top", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["pr", { styleName: "padding-right", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["pb", { styleName: "padding-bottom", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["pl", { styleName: "padding-left", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  // 外边距 TODO mx my
  ["m", { styleName: "margin", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG] }],
  ["mt", { styleName: "margin-top", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG] }],
  ["mr", { styleName: "margin-right", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG] }],
  ["mb", { styleName: "margin-bottom", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG] }],
  ["ml", { styleName: "margin-left", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG] }],
  // 宽高 不一致，tailwindcss是/，替换为直接%，有其他差异
  ["w", { styleName: "width", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  ["min-w", { styleName: "min-width", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  ["max-w", { styleName: "max-width", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  ["h", { styleName: "height", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  ["max-h", { styleName: "max-height", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  ["min-h", { styleName: "min-height", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  // 字体序列，字体平滑度未实现
  // 字体大小 tailwindcss不一致
  ["font-size", { styleName: "font-size", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  // 字体名称
  ["font-family", { styleName: "font-family", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // 字体样式
  ["italic", { styleName: "font-style", valType: "classFullName", placeholder: "string", accept: [STRING_REG] }],
  ["not-italic", { preStyle: "font-style: normal; ", placeholder: "" }],
  // 字体粗细 tailwindcss不一致
  ["font-weight", { styleName: "font-weight", valType: "classValue", placeholder: "number|string", accept: [HUNDRED_REG, STRING_REG] }],
  // Font Variant Numeric 未实现
  // 字母间距
  ["letter-spacing", { styleName: "letter-spacing", valType: "classValue", hasUnit: true, willRatio: true, placeholder: "number", accept: [NUMBER_REG] }],
  // 行高
  ["line-height", { styleName: "line-height", valType: "classValue", hasUnit: true, willRatio: true, placeholder: "number", accept: [NUMBER_REG] }],
  // 列表项标记类型
  ["list", { styleName: "list-style-type", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["list-inside", { preStyle: "list-style-position: inside; ", placeholder: "" }],
  ["list-outside", { preStyle: "list-style-position: outside; ", placeholder: "" }],
  // 文本对齐
  ["text", { styleName: "text-align", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // 文本颜色 tailwindcss不一致 文本颜色不透明度未实现
  ["color", { styleName: "color", valType: "classValue", placeholder: "#string", accept: [STRING_REG] }],
  // 文本装饰
  ["underline", { styleName: "text-decoration", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["line-through", { styleName: "text-decoration", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["no-underline", { styleName: "text-decoration", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  // 文本转换
  ["uppercase", { styleName: "text-transform", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["lowercase", { styleName: "text-transform", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["capitalize", { styleName: "text-transform", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  ["normal-case", { styleName: "text-transform", valType: "classFullName", placeholder: "", accept: [STRING_REG] }],
  // 文本溢出
  ["truncate", { preStyle: "overflow: hidden; text-overflow: ellipsis; white-space: nowrap; ", placeholder: "" }],
  ["overflow-ellipsis", { styleName: "text-overflow", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["overflow-clip", { styleName: "text-overflow", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // 垂直对齐
  ["vertical-align", { styleName: "vertical-align", valType: "classValue", valueWrapper: { top: "text-top", bottom: "text-bottom" }, placeholder: "string", accept: [STRING_REG] }],
  // 空格
  ["whitespace", { styleName: "white-space", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["whitespace-pre", { styleName: "white-space", valType: "classValue", valueWrapper: { line: "pre-line", wrap: "pre-wrap" }, placeholder: "string", accept: [STRING_REG] }],
  // 文本换行
  ["break-normal", { preStyle: "overflow-wrap: normal; word-break: normal; ", placeholder: "" }],
  ["break-words", { preStyle: "overflow-wrap: break-word; ", placeholder: "" }],
  ["break-all", { preStyle: "word-break: break-all; ", placeholder: "" }],
  // 背景图像固定
  ["bg-fixed", { styleName: "background-attachment", valType: "classValue", placeholder: "", accept: [STRING_REG] }],
  ["bg-local", { styleName: "background-attachment", valType: "classValue", placeholder: "", accept: [STRING_REG] }],
  ["bg-scroll", { styleName: "background-attachment", valType: "classValue", placeholder: "", accept: [STRING_REG] }],
  // 背景图像裁剪
  ["bg-clip", { styleName: "background-clip", valType: "classValue", valueWrapper: { border: "border-box", padding: "padding-box", content: "content-box" }, placeholder: "", accept: [STRING_REG] }],
  // 背景颜色
  ["bg-color", { styleName: "background-color", valType: "classValue", placeholder: "#string", accept: [STRING_REG] }],
  // Background Origin
  ["bg-origin", { styleName: "background-origin", valType: "classValue", valueWrapper: { border: "border-box", padding: "padding-box", content: "content-box" }, placeholder: "string", accept: [STRING_REG] }],
  // 背景图像位置 tailwindcss不一致
  ["bg-position", { styleName: "background-position", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["bg-position-left", { styleName: "background-position", valType: "classValue", valueWrapper: { bottom: "left bottom", top: "left top" }, placeholder: "string", accept: [STRING_REG] }],
  ["bg-position-right", { styleName: "background-position", valType: "classValue", valueWrapper: { bottom: "right bottom", top: "right top" }, placeholder: "string", accept: [STRING_REG] }],
  // 背景图像重复
  ["bg-no-repeat", { preStyle: "flex: 1 1 0%; ", placeholder: "" }],
  ["bg-repeat", { styleName: "background-repeat", valType: "classValue", valueWrapper: { x: "repeat-x", y: "repeat-y" }, placeholder: "string", accept: [STRING_REG] }],
  ["bg-size", { styleName: "background-size", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // 背景图像、渐变色停止 未实现
  // 边框圆角 未实现组合
  ["radius", { styleName: "border-radius", hasUnit: true, willRatio: true, preStyle: "overflow: hidden; ", valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  ["radius-tl", { styleName: "border-radius-top-left", hasUnit: true, willRatio: true, preStyle: "overflow: hidden; ", valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  ["radius-tr", { styleName: "border-radius-top-right", hasUnit: true, willRatio: true, preStyle: "overflow: hidden; ", valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  ["radius-br", { styleName: "border-radius-bottom-right", hasUnit: true, willRatio: true, preStyle: "overflow: hidden; ", valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  ["radius-bl", { styleName: "border-radius-bottom-left", hasUnit: true, willRatio: true, preStyle: "overflow: hidden; ", valType: "classValue", placeholder: "number", accept: [NUMBER_REG, FULL_REG] }],
  // 边框厚度 tailwindcss不同
  ["border-w", { styleName: "border-width", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["border-t-w", { styleName: "border-top-width", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["border-r-w", { styleName: "border-right-width", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["border-b-w", { styleName: "border-bottom-width", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  ["border-l-w", { styleName: "border-left-width", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "number", accept: [NUMBER_REG] }],
  // 边框颜色
  ["border-color", { styleName: "border-color", valType: "classValue", placeholder: "#string", accept: [STRING_REG] }],
  // 边框不透明度、分割线、轮廓环未实现
  // 边框样式
  ["border-style", { styleName: "border-style", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  // shadow _实现多值
  ["shadow", { styleName: "box-shadow", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "x_x_x_x_#xxx", accept: [STRING_REG] }],
  // 不透明度
  ["opacity", { styleName: "opacity", valType: "percent", placeholder: "0~100", accept: [NUMBER_REG] }],
  // mix-blend
  ["mix-blend", { styleName: "mix-blend-mode", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["mix-blend-color-dodge", { preStyle: "mix-blend-mode: color-dodge; ", placeholder: "" }],
  ["mix-blend-color-burn", { preStyle: "mix-blend-mode: color-burn; ", placeholder: "" }],
  ["mix-blend-soft-light", { preStyle: "mix-blend-mode:soft-light; ", placeholder: "" }],
  // Background Blend Mode
  ["bg-mix-blend", { styleName: "mix-blend-mode", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["bg-mix-blend-color-dodge", { preStyle: "mix-blend-mode: color-dodge; ", placeholder: "" }],
  ["bg-mix-blend-color-burn", { preStyle: "mix-blend-mode: color-burn; ", placeholder: "" }],
  ["bg-mix-blend-soft-light", { preStyle: "mix-blend-mode:soft-light; ", placeholder: "" }],
  // filter backdrop-filter tailwindcss不一致,采用[],待优化
  ["filter", { styleName: "filter", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMBER_REG] }],
  ["backdrop-filter", { styleName: "backdrop-filter", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMBER_REG] }],
  // 表格边框
  ["border-collapse", { styleName: "border-collapse", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  ["border-separate", { styleName: "border-collapse", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //////////////////////做到此处，待续//////////

  ["transition", { styleName: "transition", valType: "classValue", hasUnit: true, unit: "ms", placeholder: "ms", accept: [NUMBER_REG, FULL_REG] }],

  ["rotate", { styleName: "transform", valType: "bracket", hasUnit: true, unit: "deg", placeholder: "deg", accept: [NUMBER_REG, MINUS_NUMBER_REG] }],
  ["translateX", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG, FULL_REG] }],
  ["translateY", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG, FULL_REG] }],
  ["translateZ", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMBER_REG, MINUS_NUMBER_REG, FULL_REG] }],
  ["scale", { styleName: "transform", valType: "bracket", placeholder: "number", accept: [NUMBER_REG] }],
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
generateSnippetsJSON() // 需要生成提示时，执行一下，在【调试控制台】查看结果

module.exports = classMap
