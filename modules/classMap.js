/**
 * valueType
 *  - value   class="xx-value"
 *  - key     class="key-value"
 *  - percent value/100
 * hasSuffix 是否有单位后缀
 */
const classMap = {
  // margin
  m: { styleName: "margin", hasSuffix: true, valueType: "value" },
  mt: { styleName: "margin-top", hasSuffix: true, valueType: "value" },
  mr: { styleName: "margin-right", hasSuffix: true, valueType: "value" },
  mb: { styleName: "margin-bottom", hasSuffix: true, valueType: "value" },
  ml: { styleName: "margin-left", hasSuffix: true, valueType: "value" },

  // padding
  p: { styleName: "padding", hasSuffix: true, valueType: "value" },
  pt: { styleName: "padding-top", hasSuffix: true, valueType: "value" },
  pr: { styleName: "padding-right", hasSuffix: true, valueType: "value" },
  pb: { styleName: "padding-bottom", hasSuffix: true, valueType: "value" },
  pl: { styleName: "padding-left", hasSuffix: true, valueType: "value" },

  // top, right, bottom ,left
  t: { styleName: "top", hasSuffix: true, valueType: "value" },
  top: { styleName: "top", hasSuffix: true, valueType: "value" },
  r: { styleName: "right", hasSuffix: true, valueType: "value" },
  right: { styleName: "right", hasSuffix: true, valueType: "value" },
  b: { styleName: "bottom", hasSuffix: true, valueType: "value" },
  bottom: { styleName: "bottom", hasSuffix: true, valueType: "value" },
  l: { styleName: "left", hasSuffix: true, valueType: "value" },
  left: { styleName: "left", hasSuffix: true, valueType: "value" },

  // position
  static: { styleName: "position", valueType: "key" },
  relative: { styleName: "position", valueType: "key" },
  absolute: { styleName: "position", valueType: "key" },
  sticky: { styleName: "position", valueType: "key" },
  fixed: { styleName: "position", valueType: "key" },

  inline: { styleName: "display", valueType: "key" },
  "inline-block": { styleName: "display", valueType: "key" },
  block: { styleName: "display", valueType: "key" },
  flex: { styleName: "display", valueType: "key" },

  justify: { styleName: "justify-content", valuePrefix: "space-", valueType: "value" },
  align: { styleName: "align-items", valueType: "value" },

  // radius
  radius: { styleName: "border-radius", hasSuffix: true, valueType: "value" },

  // font
  fs: { styleName: "font-size", hasSuffix: true, valueType: "value" },
  "font-size": { styleName: "font-size", hasSuffix: true, valueType: "value" },
  fw: { styleName: "font-weight", valueType: "value" },
  "font-weight": { styleName: "font-weight", valueType: "value" },
  fm: { styleName: "font-family", valueType: "value" },
  "font-family": { styleName: "font-family", valueType: "value" },

  // color
  c: { styleName: "color", valueType: "value" },
  color: { styleName: "color", valueType: "value" },

  // bacground-color
  bg: { styleName: "background-color", valueType: "value" },

  // opacity
  opacity: { styleName: "opacity", valueType: "percent" },
}

module.exports = classMap
