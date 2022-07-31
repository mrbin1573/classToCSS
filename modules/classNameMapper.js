const NUMS_REG = "\\d+" // 数字
const MINUS_NUMS_REG = "-?\\d+" // 数字（含负数）
const HUNDR_REG = "[1-9]{1}0{2}" // 100~900
const HEX_REG = "[a-fA-F0-9]" // 十六进制
const HEX_CLR_REG = `${HEX_REG}{3,}` // 十六进制颜色
const SPC_REG = `\\[(\\w+)\\]` // 特殊值[]
const MULT_VAL = /\w+_\w+/ // 多个值 xx-111_222

const commonWrapper = ({ stlNms, val, ratio = 1, unit = "", isSpecial }) =>
  stlNms.reduce((acc, styleName) => {
    const isMultiVal = MULT_VAL.test(val)
    let values = isMultiVal ? val.split("_") : [val]
    values = values.reduce((acc, valItem) => {
      return acc + (isSpecial ? ` ${valItem}` : ` ${valItem * ratio}${unit}`)
    }, "")

    return acc + `${styleName}: ${values}; `
  }, "")

const classNameMapper = [
  // padding
  { matchReg: eval(`/^p-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["padding"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^p-(${NUMS_REG}(\\_${NUMS_REG})+)$/`), wrapper: (...args) => commonWrapper({ stlNms: ["padding"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^pt-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["padding-top"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^pr-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["padding-right"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^pb-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["padding-bottom"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^pl-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["padding-left"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^px-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["padding-left", "padding-right"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^py-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["padding-top", "padding-bottom"], ...args[0] }), placeholder: "number" },

  // margin
  { matchReg: eval(`/^m-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["margin"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^m-(${MINUS_NUMS_REG}(\\_${NUMS_REG})+)$/`), wrapper: (...args) => commonWrapper({ stlNms: ["margin"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^mt-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["margin-top"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^mr-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["margin-right"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^mb-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["margin-bottom"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^ml-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["margin-left"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^mx-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["margin-left", "margin-right"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^my-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["margin-top", "margin-bottom"], ...args[0] }), placeholder: "number" },

  // 宽高
  { matchReg: eval(`/^w-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["width"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^h-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["height"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^w-(full)$/`), wrapper: () => `width: 100%;`, placeholder: "number" },
  { matchReg: eval(`/^h-(full)$/`), wrapper: () => `height: 100%;`, placeholder: "number" },
  { matchReg: eval(`/^w-(${NUMS_REG})vw$/`), wrapper: ({ val }) => `width: ${val}vw;`, placeholder: "number" },
  { matchReg: eval(`/^h-(${NUMS_REG})vh$/`), wrapper: ({ val }) => `height: ${val}vh;`, placeholder: "number" },
  { matchReg: eval(`/^w-(${NUMS_REG})p$/`), wrapper: ({ val }) => `width: ${val}%;`, placeholder: "number" },
  { matchReg: eval(`/^h-(${NUMS_REG})p$/`), wrapper: ({ val }) => `height: ${val}%;`, placeholder: "number" },
  { matchReg: eval(`/^max-w-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["max-width"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^max-h-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["max-height"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^min-w-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["min-width"], ...args[0] }), placeholder: "number" },
  { matchReg: eval(`/^min-h-(${NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["min-height"], ...args[0] }), placeholder: "number" },

  // position
  { matchReg: eval(`/^(static|relative|absolute|fixed|sticky)$/`), wrapper: ({ val }) => `position: ${val};`, placeholder: "string" },

  // Top / Right / Bottom / Left
  { matchReg: eval(`/^top-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["top"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^right-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["right"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^bottom-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["bottom"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^left-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["left"], ...args[0] }), placeholder: "string" },

  // z-index
  { matchReg: eval(`/^z-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: ({ val }) => `z-index: ${val};`, placeholder: "string" },

  // Box Sizing
  { matchReg: eval(`/^border-box$/`), wrapper: () => `box-sizing: border-box;`, placeholder: "string" },
  { matchReg: eval(`/^content-box$/`), wrapper: () => `box-sizing: content-box;`, placeholder: "string" },

  // Display
  { matchReg: eval(`/^block$/`), wrapper: () => `display: block;`, placeholder: "string" },
  { matchReg: eval(`/^inline$/`), wrapper: () => `display: inline;`, placeholder: "string" },
  { matchReg: eval(`/^inline-block$/`), wrapper: () => `display: inline-block;`, placeholder: "string" },
  { matchReg: eval(`/^flex$/`), wrapper: () => `display: flex;`, placeholder: "string" },
  { matchReg: eval(`/^inline-flex$/`), wrapper: () => `display: inline-flex;`, placeholder: "string" },
  { matchReg: eval(`/^table$/`), wrapper: () => `display: table;`, placeholder: "string" },
  { matchReg: eval(`/^inline-table$/`), wrapper: () => `display: inline-table;`, placeholder: "string" },
  { matchReg: eval(`/^table-caption$/`), wrapper: () => `display: table-caption;`, placeholder: "string" },
  { matchReg: eval(`/^table-cell$/`), wrapper: () => `display: table-cell;`, placeholder: "string" },
  { matchReg: eval(`/^table-column$/`), wrapper: () => `display: table-column;`, placeholder: "string" },
  { matchReg: eval(`/^table-column-group$/`), wrapper: () => `display: table-column-group;`, placeholder: "string" },
  { matchReg: eval(`/^table-footer-group$/`), wrapper: () => `display: table-footer-group;`, placeholder: "string" },
  { matchReg: eval(`/^table-row-group$/`), wrapper: () => `display: table-row-group;`, placeholder: "string" },

  // float
  { matchReg: eval(`/^fl$/`), wrapper: () => `float: left;`, placeholder: "string" },
  { matchReg: eval(`/^fr$/`), wrapper: () => `float: right;`, placeholder: "string" },
  { matchReg: eval(`/^float-(none|left|right|inlineleft|inline-right|${SPC_REG})$/`), wrapper: ({ val }) => `float: ${val};`, placeholder: "string" },

  // overflow
  { matchReg: eval(`/^overflow-(visible|hidden|scroll|auto|overlay|${SPC_REG})$/`), wrapper: ({ val }) => `overflow: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^overflow-x-(visible|hidden|scroll|auto|${SPC_REG})$/`), wrapper: ({ val }) => `overflow-x: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^overflow-y-(visible|hidden|scroll|auto|${SPC_REG})$/`), wrapper: ({ val }) => `overflow-y: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^scroll-x$/`), wrapper: () => `overflow-x: auto; overflow-y: hidden;`, placeholder: "string" },
  { matchReg: eval(`/^scroll-y$/`), wrapper: () => `overflow-x: hidden; overflow-y: auto;`, placeholder: "string" },

  // visibility
  { matchReg: eval(`/^visibility-(hidden|visible|collapse|${SPC_REG})$/`), wrapper: ({ val }) => `visibility: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^visible$/`), wrapper: () => `visibility: visible;`, placeholder: "string" },
  { matchReg: eval(`/^invisible$/`), wrapper: () => `visibility: hidden;`, placeholder: "string" },

  // flex direction
  { matchReg: eval(`/^flex-(row|row-reverse|column-reverse|${SPC_REG})$/`), wrapper: ({ val }) => `flex-direction: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^(flex-col|col)$/`), wrapper: () => `flex-direction: column;`, placeholder: "string" },
  { matchReg: eval(`/^col-reverse$/`), wrapper: () => `flex-direction: column-reverse;`, placeholder: "string" },
  { matchReg: eval(`/^row$/`), wrapper: () => `display: flex; flex-direction: row;`, placeholder: "string" },
  { matchReg: eval(`/^column$/`), wrapper: () => `display: flex; flex-direction: column;`, placeholder: "string" },

  // justify content
  { matchReg: eval(`/^justify-(center|start|end|flex-start|flex-end|left|right|${SPC_REG})$/`), wrapper: ({ val }) => `justify-content: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^space-between|between$/`), wrapper: () => `justify-content: space-between;`, placeholder: "string" },
  { matchReg: eval(`/^space-around|around$/`), wrapper: () => `justify-content: space-around;`, placeholder: "string" },
  { matchReg: eval(`/^space-evenly|justify-evenly|evenly$/`), wrapper: () => `justify-content: space-evenly;`, placeholder: "string" },

  // justify items
  { matchReg: eval(`/^justify-items-(center|start|end|flex-start|flex-end|left|right|start|${SPC_REG})$/`), wrapper: ({ val }) => `justify-items: ${val};`, placeholder: "string" },

  // justify self
  { matchReg: eval(`/^justify-self-(center|start|end|stretcht|${SPC_REG})$/`), wrapper: ({ val }) => `justify-self: ${val};`, placeholder: "string" },

  // align items
  { matchReg: eval(`/^items-(center|start|end|flex-start|flex-end|self-start|self-end|${SPC_REG})$/`), wrapper: ({ val }) => `align-items: ${val};`, placeholder: "string" },

  // align content
  { matchReg: eval(`/^content-(center|start|end|flex-start|flex-end|${SPC_REG})$/`), wrapper: ({ val }) => `align-content: ${val};`, placeholder: "string" },

  // align self
  { matchReg: eval(`/^self-(auto|normal|center|stretcht|self-start|self-end|flex-start|flex-end|${SPC_REG})$/`), wrapper: ({ val }) => `align-self: ${val};`, placeholder: "string" },

  // flex wrap
  { matchReg: eval(`/^flex-(wrap|wrap-reverse|nowrap|${SPC_REG})$/`), wrapper: ({ val }) => `flex-wrap: ${val};`, placeholder: "string" },

  // flex grow shrink
  { matchReg: eval(`/^flex-1$/`), wrapper: () => `flex: 1 1 0%;`, placeholder: "string" },
  { matchReg: eval(`/^flex-auto$/`), wrapper: () => `flex: 1 1 auto;`, placeholder: "string" },
  { matchReg: eval(`/^flex-none$/`), wrapper: () => `flex: 0 0 auto;`, placeholder: "string" },
  { matchReg: eval(`/^flex-grow$/`), wrapper: () => `flex-grow: 1;`, placeholder: "string" },
  { matchReg: eval(`/^flex-shrink$/`), wrapper: () => `flex-shrink: 1;`, placeholder: "string" },
  { matchReg: eval(`/^flex-grow-(${NUMS_REG})$/`), wrapper: ({ val }) => `flex-grow: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^flex-shrink-(${NUMS_REG})$/`), wrapper: ({ val }) => `flex-shrink: ${val};`, placeholder: "string" },

  // order
  { matchReg: eval(`/^order-(${MINUS_NUMS_REG}|${SPC_REG})$/`), wrapper: ({ val }) => `order: ${val};`, placeholder: "string" },

  // font size
  { matchReg: eval(`/^(font-size|fs)-(${NUMS_REG}|${SPC_REG})$/`), valIndex: 2, wrapper: (...args) => commonWrapper({ stlNms: ["font-size"], ...args[0] }), placeholder: "string" },

  // font weight
  { matchReg: eval(`/^(font-weight|fw)-(${HUNDR_REG}|${SPC_REG})$/`), valIndex: 2, wrapper: ({ val }) => `font-weight: ${val};`, placeholder: "string" },

  // font family
  { matchReg: eval(`/^(font-family|ff)-(\\S+|${SPC_REG})$/`), valIndex: 2, wrapper: ({ val }) => `font-family: ${val};`, placeholder: "string" },

  // font style
  { matchReg: eval(`/^font-style-(italic|oblique|normal|${SPC_REG})$/`), wrapper: ({ val }) => `font-style: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^fs-(italic|oblique|normal|${SPC_REG})$/`), wrapper: ({ val }) => `font-style: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^italic$/`), wrapper: () => `font-style: italic;`, placeholder: "string" },

  // letter-spacing
  { matchReg: eval(`/^ls-(${NUMS_REG}|${SPC_REG})$/`), wrapper: ({ val, unit = "" }) => `letter-spacing: ${val}${unit};`, placeholder: "string" },
  { matchReg: eval(`/^letter-spacing-(${NUMS_REG}|${SPC_REG})$/`), wrapper: ({ val, unit = "" }) => `letter-spacing: ${val}${unit};`, placeholder: "string" },

  // line-height 不会缩放
  { matchReg: eval(`/^(line-height|lh)-(${NUMS_REG}|${NUMS_REG}\\w+|${SPC_REG})$/`), valIndex: 2, wrapper: ({ val }) => `line-height: ${val};`, placeholder: "string" },

  // color
  { matchReg: eval(`/^color-(${HEX_CLR_REG}|${SPC_REG})$/`), wrapper: ({ val }) => `color: #${val};`, placeholder: "string" },

  // border radius
  { matchReg: eval(`/^(radius|r)-(${NUMS_REG}|${SPC_REG})$/`), valIndex: 2, wrapper: (...args) => commonWrapper({ stlNms: ["overflow: hidden; border-radius"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^(radius-tl|r-tl)-(${NUMS_REG}|${SPC_REG})$/`), valIndex: 2, wrapper: (...args) => commonWrapper({ stlNms: ["overflow: hidden; border-top-left-radius"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^(radius-tr|r-tr)-(${NUMS_REG}|${SPC_REG})$/`), valIndex: 2, wrapper: (...args) => commonWrapper({ stlNms: ["overflow: hidden; border-top-right-radius"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^(radius-br|r-br)-(${NUMS_REG}|${SPC_REG})$/`), valIndex: 2, wrapper: (...args) => commonWrapper({ stlNms: ["overflow: hidden; border-bottom-right-radius"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^(radius-bl|r-bl)-(${NUMS_REG}|${SPC_REG})$/`), valIndex: 2, wrapper: (...args) => commonWrapper({ stlNms: ["overflow: hidden; border-bottom-left-radius"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^(round|radius-full)$/`), wrapper: () => `overflow: hidden; border-radius: 100%;`, placeholder: "string" },

  // border width 两位数是width 三位数以上是颜色 十六进制的自定义样式需要注意
  { matchReg: eval(`/^border-(\\d{1,2}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["border-width"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^border-t-(\\d{1,2}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["border-top-width"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^border-r-(\\d{1,2}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["border-right-width"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^border-b-(\\d{1,2}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["border-bottom-width"], ...args[0] }), placeholder: "string" },
  { matchReg: eval(`/^border-l-(\\d{1,2}|${SPC_REG})$/`), wrapper: (...args) => commonWrapper({ stlNms: ["border-left-width"], ...args[0] }), placeholder: "string" },

  // border color 两位数是width 三位数以上是颜色 十六进制的自定义样式需要注意
  { matchReg: eval(`/^border-(${HEX_CLR_REG})$/`), wrapper: ({ val }) => `border-color: #${val};`, placeholder: "string" },

  // border style TODO 多个值
  { matchReg: eval(`/^border-(none|dotted|inset)$/`), wrapper: ({ val }) => `border-style: ${val};`, placeholder: "string" },

  // opacity 0~100
  { matchReg: eval(`/^opacity-(${NUMS_REG}|${SPC_REG})$/`), wrapper: ({ val }) => `opacity: ${val / 100};`, placeholder: "string" },

  // cursor 太多了直接写
  { matchReg: eval(`/^cursor-(\\w+|${SPC_REG})$/`), wrapper: ({ val }) => `cursor: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^pointer$/`), wrapper: () => `cursor: pointer;`, placeholder: "string" },
  { matchReg: eval(`/^not-allowed$/`), wrapper: () => `cursor: not-allowed;`, placeholder: "string" },

  // user select
  { matchReg: eval(`/^select-(none|auto|text|contain|all|${SPC_REG})$/`), wrapper: ({ val }) => `user-select: ${val};`, placeholder: "string" },

  // list style type
  { matchReg: eval(`/^list-(none|disc|circle|square|decimal|${SPC_REG})$/`), wrapper: ({ val }) => `list-style-type: ${val};`, placeholder: "string" },

  // list style position
  { matchReg: eval(`/^list-(inside|outsidel)$/`), wrapper: ({ val }) => `list-style-position: ${val};`, placeholder: "string" },

  // text align
  { matchReg: eval(`/^text-(left|right|center|justify|justify-all|start|end|${SPC_REG})$/`), wrapper: ({ val }) => `text-align: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^t-l$/`), wrapper: () => `text-align: left;`, placeholder: "string" },
  { matchReg: eval(`/^t-r$/`), wrapper: () => `text-align: right;`, placeholder: "string" },
  { matchReg: eval(`/^t-c$/`), wrapper: () => `text-align: center;`, placeholder: "string" },

  // text decoration line

  { matchReg: eval(`/^decoration-(none|underline|overline|line-through|blink|unset|${SPC_REG})$/`), wrapper: ({ val }) => `text-decoration-line: ${val};`, placeholder: "string" },
  { matchReg: eval(`/^underline$/`), wrapper: () => `text-decoration-line: underline;`, placeholder: "string" },
  { matchReg: eval(`/^line-through$/`), wrapper: () => `text-decoration-line: line-through;`, placeholder: "string" },

  // text decoration color
  { matchReg: eval(`/^decoration-(${HEX_CLR_REG}|${SPC_REG})$/`), wrapper: ({ val }) => `text-decoration-color: #${val};`, placeholder: "string" },

  // text decoration style
  { matchReg: eval(`/^decoration-(solid|double|dotted|dashed|wavy)$/`), wrapper: ({ val }) => `text-decoration-style: ${val};`, placeholder: "string" },

  // 文本溢出[...]
  { matchReg: eval(`/^truncate$/`), wrapper: () => `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`, placeholder: "string" },

  // 文本大小写转换
  { matchReg: eval(`/^(capitalize|uppercase|lowercase)$/`), wrapper: ({ val }) => `text-transform: ${val};`, placeholder: "string" },

  // 背景颜色
  { matchReg: eval(`/^bg-(${HEX_CLR_REG}|${SPC_REG})$/`), wrapper: ({ val }) => `background-color: #${val};`, placeholder: "string" },

  // shadow
  {
    matchReg: eval(`/^shadow-((\\w+\\_)+${HEX_CLR_REG})$/`),
    wrapper: ({ val, ratio, unit }) => {
      // 转为xxpx_xxpx_#xxx形式，以特殊类型进行统一转换
      let vals = val.split("_")
      vals = vals.map((valItem, index) => {
        const isColor = index === vals.length - 1
        return isColor ? `#${valItem}` : `${valItem * ratio}${unit}`
      })

      return commonWrapper({ stlNms: ["box-shadow"], val: vals.join("_"), isSpecial: true })
    },
    placeholder: "number",
  },

  // transition duration
  { matchReg: eval(`/^duration-(${HEX_CLR_REG})$/`), wrapper: ({ val }) => `transition-duration: ${val}ms;`, placeholder: "string" },
  // transition delay
  { matchReg: eval(`/^delay-(${HEX_CLR_REG})$/`), wrapper: ({ val }) => `transition-delay: ${val}ms;`, placeholder: "string" },

  // animate
  {
    matchReg: eval(`/^animate-ping/`),
    wrapper: () => `animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
    `,
    placeholder: "string",
  },
  {
    matchReg: eval(`/^animate-spin/`),
    wrapper: () => `animation: spin 1s linear infinite; } 
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`,
    placeholder: "string",
  },
  /**
   * TODO
   * isolate
   * isolation-auto
   * Object Fit
   * overscroll
   * Grid
   * Gap
   * 字体序列，字体平滑度未实现
   * Font Variant Numeric
   * 边框不透明度、分割线、轮廓环未实现
   * 屏幕阅读器、SVG未实现
   */

  //   // Place Content
  //   ["place-content", { styleName: "place-content", valType: "classValue", valueWrapper: { between: "space-between", around: "space-around", evenly: "space-evenly" }, placeholder: "string", accept: [STRING_REG] }],
  //   // Place Items
  //   ["place-items", { styleName: "place-items", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   // Place Self
  //   ["place-self", { styleName: "place-self", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],

  //   ["overflow-ellipsis", { styleName: "text-overflow", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   ["overflow-clip", { styleName: "text-overflow", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   // 垂直对齐
  //   ["vertical-align", { styleName: "vertical-align", valType: "classValue", valueWrapper: { top: "text-top", bottom: "text-bottom" }, placeholder: "string", accept: [STRING_REG] }],
  //   // 空格
  //   ["whitespace", { styleName: "white-space", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   ["whitespace-pre", { styleName: "white-space", valType: "classValue", valueWrapper: { line: "pre-line", wrap: "pre-wrap" }, placeholder: "string", accept: [STRING_REG] }],
  //   // 文本换行
  //   ["break-normal", { preStyle: "overflow-wrap: normal; word-break: normal; " }],
  //   ["break-words", { preStyle: "overflow-wrap: break-word; " }],
  //   ["break-all", { preStyle: "word-break: break-all; " }],
  //   // 背景图像固定
  //   ["bg-fixed", { styleName: "background-attachment", valType: "classValue", accept: [STRING_REG] }],
  //   ["bg-local", { styleName: "background-attachment", valType: "classValue", accept: [STRING_REG] }],
  //   ["bg-scroll", { styleName: "background-attachment", valType: "classValue", accept: [STRING_REG] }],
  //   // 背景图像裁剪
  //   ["bg-clip", { styleName: "background-clip", valType: "classValue", valueWrapper: { border: "border-box", padding: "padding-box", content: "content-box" }, accept: [STRING_REG] }],

  //   // Background Origin
  //   ["bg-origin", { styleName: "background-origin", valType: "classValue", valueWrapper: { border: "border-box", padding: "padding-box", content: "content-box" }, placeholder: "string", accept: [STRING_REG] }],
  //   // 背景图像位置 tailwindcss不一致
  //   ["bg-position", { styleName: "background-position", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   ["bg-position-left", { styleName: "background-position", valType: "classValue", valueWrapper: { bottom: "left bottom", top: "left top" }, placeholder: "string", accept: [STRING_REG] }],
  //   ["bg-position-right", { styleName: "background-position", valType: "classValue", valueWrapper: { bottom: "right bottom", top: "right top" }, placeholder: "string", accept: [STRING_REG] }],
  //   // 背景图像重复
  //   ["bg-no-repeat", { preStyle: "flex: 1 1 0%; " }],
  //   ["bg-repeat", { styleName: "background-repeat", valType: "classValue", valueWrapper: { x: "repeat-x", y: "repeat-y" }, placeholder: "string", accept: [STRING_REG] }],
  //   ["bg-size", { styleName: "background-size", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   // 背景图像、渐变色停止 未实现

  //   // shadow _实现多值
  //   ["shadow", { styleName: "box-shadow", hasUnit: true, willRatio: true, valType: "classValue", placeholder: "x_x_x_x_#xxx", accept: [STRING_REG] }],

  //   // mix-blend
  //   ["mix-blend", { styleName: "mix-blend-mode", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   ["mix-blend-color-dodge", { preStyle: "mix-blend-mode: color-dodge; " }],
  //   ["mix-blend-color-burn", { preStyle: "mix-blend-mode: color-burn; " }],
  //   ["mix-blend-soft-light", { preStyle: "mix-blend-mode:soft-light; " }],
  //   // Background Blend Mode
  //   ["bg-mix-blend", { styleName: "mix-blend-mode", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   ["bg-mix-blend-color-dodge", { preStyle: "mix-blend-mode: color-dodge; " }],
  //   ["bg-mix-blend-color-burn", { preStyle: "mix-blend-mode: color-burn; " }],
  //   ["bg-mix-blend-soft-light", { preStyle: "mix-blend-mode:soft-light; " }],
  //   // filter backdrop-filter tailwindcss不一致,采用[],待优化
  //   ["filter", { styleName: "filter", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG] }],
  //   ["backdrop-filter", { styleName: "backdrop-filter", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG] }],
  //   // 表格边框
  //   ["border-collapse", { styleName: "border-collapse", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   ["border-separate", { styleName: "border-collapse", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   // 表格布局
  //   ["table-auto", { styleName: "table-layout", valType: "classValue", accept: [STRING_REG] }],
  //   ["table-fixed", { styleName: "table-layout", valType: "classValue", accept: [STRING_REG] }],
  //   // 下划线传值,TODO下划线杂糅中划线
  //   ["ease", { styleName: "transition-timing-function", valType: "classValue", accept: [STRING_REG] }],
  //   ["delay", { styleName: "transition-delay", valType: "classValue", hasUnit: true, unit: "ms", placeholder: "ms", accept: [NUMS_REG, FULL_REG] }],
  //   // 动画animate
  //   ["animate-none", { preStyle: "animation: none; " }],

  //   [
  //     "animate-ping",
  //     {
  //       preStyle: "animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;",
  //       isolateStyle: `@keyframes ping {
  //   75%, 100% {
  //     transform: scale(2);
  //     opacity: 0;
  //   }
  // })$/`,
  //       placeholder: "",
  //     },
  //   ],
  //   [
  //     "animate-pulse",
  //     {
  //       preStyle: "animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
  //       isolateStyle: `@keyframes pulse {
  //   0%, 100% {
  //     opacity: 1;
  //   }
  //   50% {
  //     opacity: .5;
  //   }
  // })$/`,
  //       placeholder: "",
  //     },
  //   ],
  //   [
  //     "animate-bounce",
  //     {
  //       preStyle: "animation: bounce 1s infinite;",
  //       isolateStyle: `@keyframes bounce {
  //   0%, 100% {
  //     transform: translateY(-25%);
  //     animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  //   }
  //   50% {
  //     transform: translateY(0);
  //     animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  //   }
  // })$/`,
  //       placeholder: "",
  //     },
  //   ],
  //   // 变换原点 下划线双值
  //   ["origin", { styleName: "transform-origin", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   // 缩放 比tailwindcss全
  //   ["scale", { styleName: "transform", valType: "bracket", placeholder: "number", accept: [NUMS_REG] }],
  //   ["scaleX", { styleName: "transform", valType: "bracket", placeholder: "number", accept: [NUMS_REG] }],
  //   ["scaleY", { styleName: "transform", valType: "bracket", placeholder: "number", accept: [NUMS_REG] }],
  //   ["scaleZ", { styleName: "transform", valType: "bracket", placeholder: "number", accept: [NUMS_REG] }],
  //   // 旋转 比tailwindcss全
  //   ["rotate", { styleName: "transform", valType: "bracket", hasUnit: true, unit: "deg", placeholder: "deg", accept: [NUMS_REG, MINUS_NUMS_REG] }],
  //   ["rotateX", { styleName: "transform", valType: "bracket", hasUnit: true, unit: "deg", placeholder: "deg", accept: [NUMS_REG, MINUS_NUMS_REG] }],
  //   ["rotateY", { styleName: "transform", valType: "bracket", hasUnit: true, unit: "deg", placeholder: "deg", accept: [NUMS_REG, MINUS_NUMS_REG] }],
  //   ["rotateZ", { styleName: "transform", valType: "bracket", hasUnit: true, unit: "deg", placeholder: "deg", accept: [NUMS_REG, MINUS_NUMS_REG] }],
  //   ["rotate3d", { styleName: "transform", valType: "bracket", hasUnit: true, unit: "deg", placeholder: "deg", accept: [NUMS_REG, MINUS_NUMS_REG] }],
  //   // 平移 比tailwindcss全
  //   ["translate", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG, MINUS_NUMS_REG, FULL_REG] }],
  //   ["translateX", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG, MINUS_NUMS_REG, FULL_REG] }],
  //   ["translateY", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG, MINUS_NUMS_REG, FULL_REG] }],
  //   ["translateZ", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG, MINUS_NUMS_REG, FULL_REG] }],
  //   ["translate3d", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG, MINUS_NUMS_REG, FULL_REG] }],
  //   // 倾斜
  //   ["skew", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG, MINUS_NUMS_REG, FULL_REG] }],
  //   ["skewX", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG, MINUS_NUMS_REG, FULL_REG] }],
  //   ["skewY", { styleName: "transform", valType: "bracket", hasUnit: true, placeholder: "number", accept: [NUMS_REG, MINUS_NUMS_REG, FULL_REG] }],
  //   // 表单外观 未实现
  //   // 轮廓
  //   ["outline-none", { preStyle: "outline: 2px solid transparent; outline-offset: 2px; " }],
  //   ["outline-white", { preStyle: "outline: 2px dotted white; outline-offset: 2px; " }],
  //   ["outline-black", { preStyle: "outline: 2px dotted black; outline-offset: 2px; " }],
  //   // 指向事件
  //   ["pointer-events", { styleName: "pointer-events", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   // 大小调整 比tailwindcss不同
  //   ["resize", { styleName: "resize", valType: "classValue", placeholder: "string", accept: [STRING_REG] }],
  //   // 用户选择
]

/**
 * 生成全局累加个数空格
 */
// const generateSpace = (function () {
//   let total = 1
//   return () => {
//     let res = ""
//     for (let index = 0; index < total; index++) {
//       res += " "
//     }
//     total++
//     return res
//   }
// })()
// const generateSnippetsJSON = () => {
//   const jsonObj = {}
//   classNameMapper.forEach(({ styleName, placeholder }, key) => {
//     let name = styleName ? (jsonObj[styleName] ? `(${styleName}(${generateSpace()})$/` : styleName) : key

//     jsonObj[name] = {
//       prefix: key,
//       body: placeholder ? `(${key}-\(${0: (${ placeholder }
//   })$ / ` : key,
//     }
//   })

//   console.log("snippets.json=====>", JSON.stringify(jsonObj))
// }
// // generateSnippetsJSON() // 需要生成提示时，执行一下，在【调试控制台】查看结果

module.exports = { classNameMapper, SPC_REG }
