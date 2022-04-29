/**
 * valueType
 *  - value   class="xx-value"
 *  - key     class="key-value"
 *  - percent value/100
 * hasSuffix 是否有单位后缀
 */
const classMap = {
  // margin
  m: { styleName: "margin", hasSuffix: true, valueType: "value", placeholder: "Number" },
  mt: { styleName: "margin-top", hasSuffix: true, valueType: "value", placeholder: "Number" },
  mr: { styleName: "margin-right", hasSuffix: true, valueType: "value", placeholder: "Number" },
  mb: { styleName: "margin-bottom", hasSuffix: true, valueType: "value", placeholder: "Number" },
  ml: { styleName: "margin-left", hasSuffix: true, valueType: "value", placeholder: "Number" },

  // padding
  p: { styleName: "padding", hasSuffix: true, valueType: "value", placeholder: "Number" },
  pt: { styleName: "padding-top", hasSuffix: true, valueType: "value", placeholder: "Number" },
  pr: { styleName: "padding-right", hasSuffix: true, valueType: "value", placeholder: "Number" },
  pb: { styleName: "padding-bottom", hasSuffix: true, valueType: "value", placeholder: "Number" },
  pl: { styleName: "padding-left", hasSuffix: true, valueType: "value", placeholder: "Number" },

  // top, right, bottom ,left
  t: { styleName: "top", hasSuffix: true, valueType: "value", placeholder: "Number" },
  top: { styleName: "top", hasSuffix: true, valueType: "value", placeholder: "Number" },
  r: { styleName: "right", hasSuffix: true, valueType: "value", placeholder: "Number" },
  right: { styleName: "right", hasSuffix: true, valueType: "value", placeholder: "Number" },
  b: { styleName: "bottom", hasSuffix: true, valueType: "value", placeholder: "Number" },
  bottom: { styleName: "bottom", hasSuffix: true, valueType: "value", placeholder: "Number" },
  l: { styleName: "left", hasSuffix: true, valueType: "value", placeholder: "Number" },
  left: { styleName: "left", hasSuffix: true, valueType: "value", placeholder: "Number" },

  // position
  static: { styleName: "position", valueType: "key", placeholder: "" },
  relative: { styleName: "position", valueType: "key", placeholder: "" },
  absolute: { styleName: "position", valueType: "key", placeholder: "" },
  sticky: { styleName: "position", valueType: "key", placeholder: "" },
  fixed: { styleName: "position", valueType: "key", placeholder: "" },

  inline: { styleName: "display", valueType: "key", placeholder: "" },
  "inline-block": { styleName: "display", valueType: "key", placeholder: "" },
  block: { styleName: "display", valueType: "key", placeholder: "" },
  flex: { styleName: "display", valueType: "key", placeholder: "" },

  justify: { styleName: "justify-content", prefix: "", valueType: "value", placeholder: "|" },
  align: { styleName: "align-items", valueType: "value", placeholder: "|" },

  // radius
  radius: { styleName: "border-radius", hasSuffix: true, valueType: "value", placeholder: "Number" },

  // font
  fs: { styleName: "font-size", hasSuffix: true, valueType: "value", placeholder: "Number" },
  fw: { styleName: "font-weight", valueType: "value", placeholder: "Number|String" },
  fm: { styleName: "font-family", valueType: "value", placeholder: "String" },

  // color
  color: { styleName: "color", valueType: "value", placeholder: "String" },

  // bacground-color
  bg: { styleName: "background-color", valueType: "value", placeholder: "String" },

  // opacity
  opacity: { styleName: "opacity", valueType: "percent", placeholder: "0~100" },

  // transition
  transition: { styleName: "transition", valueType: "percent", suffix: "ms", placeholder: "ms" },
}

const generateSnippetsJSON = () => {
  const jsonObj = {}
  for (const key in classMap) {
    if (Object.hasOwnProperty.call(classMap, key)) {
      const { styleName, valueType, placeholder } = classMap[key]
      const isNotKeyValue = valueType !== "key"
      const jsonName = isNotKeyValue ? styleName : `${styleName}-${key}`

      jsonObj[jsonName] = {
        prefix: key,
        body: `${key}${isNotKeyValue ? "-" : ""}\${0:${placeholder}}`,
      }
    }
  }

  console.log(JSON.stringify(jsonObj))
}
// generateSnippetsJSON() // 需要生成提示时，执行一下，在【调试控制台】查看结果

module.exports = classMap
