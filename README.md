classToCSS, 一款自动生成 `css` 的`VSCode`插件

> 根目录生成 classtocss_global.css 文件，所有 stlye 都编译在里面。需要手动引入至项目能生效得地方

- 一次安装，永久任意项目生效

- 全局去重，有效减小压缩代码体积

- 语法参考 `tailwindcss`，使用过的可无缝衔接（有些许差异和补充，不过有提示）

- 可配置任意单位以及值缩放比例，轻松解决适配问题

- 可添加项目级配置文件，项目之间互不影响

- apply 语法任意组合，提供进一步自定义封装

- 语法结尾常用写法简写，且提供自定义值'[]'

---

# class 语法目录

- [margin](#margin)
- [padding](#padding)
- [width](#width)
- [height](#height)
- [position](#position)
- [top-right-bottom-left](#top-right-bottom-left)
- [z-index](#z-index)
- [box-sizing](#box-sizing)
- [display](#display)
- [float](#float)
- [overflow](#overflow)
- [visibility](#visibility)
- [flex-direction](#flex-direction)
- [justify-content](#justify-content)
- [justify-items](#justify-items)
- [justify-self](#justify-self)
- [align-items](#align-items)
- [align-content](#align-content)
- [align-self](#align-self)
- [flex-wrap](#flex-wrap)
- [flex-grow-shrink](#flex-grow-shrink)
- [order](#order)
- [font-size](#font-size)
- [font-weight](#font-weight)
- [font-family](#font-family)
- [font-style](#font-style)
- [letter-spacing](#letter-spacing)
- [line-height](#line-height)
- [color](#color)
- [border 多值](#border)
- [border-radius](#border-radius)
- [border-width](#border-width)
- [border-color](#border-color)
- [border-style](#border-style)
- [opacity](#opacity)
- [cursor](#cursor)
- [user-select](#user-select)
- [list-style-type](#list-style-type)
- [list-style-position](#list-style-position)
- [text-align](#text-align)
- [text-decoration-line](#text-decoration-line)
- [text-decoration-color](#text-decoration-color)
- [文本溢出显示为...](#文本溢出显示为...)
- [text-transform](#text-transform)
- [background-color](#background-color)
- [pointer-events](#pointer-events)
- [box-shadow](#box-shadow)
- [animation-duration](#animation-duration)
- [动画-上下浮动](#animate-float)
- [动画-脉冲](#animate-ping)
- [动画-旋转](#animate-spin)
- [动画-旋转逆向](#animate-spin-reverse)

---

# 配置选项

可在全局配置中设置，也可以在根目录新建`classtocss_config.json`文件，项目内的配置文件优先级高于全局配置

- unit：值单位
- valuRation：值的缩放比例（宽高、字体、边距等才会缩放）

```json
{
  "unit": "px",
  "valueRatio": 1
}
```

---

# apply 文件语法

插件会在根目录自动生成`classtocss_apply.scss`文件，写法如下

```scss
.card {
  @apply .radius-15 .p-15 .mt-10 .bg-fff;
}
```

编译后（自定义单位`rpx`，缩放比例 2）

```css
.card {
  overflow: hidden;
  border-radius: 30rpx;
  padding: 30rpx;
  margin-top: 20rpx;
  background-color: #fff;
}
```

---

# 常用快捷布局语法

可以在 classtocss_apply.scss 文件中添加更多自定义组合样式

| class       | style        | 解释                        |
| :---------- | :----------- | :-------------------------- |
| mid         | margin: 6px; | 垂直居中                    |
| center      | margin: 6px; | 水平居中                    |
| mid-center  | margin: 6px; | 水平垂直居中                |
| mid-between | margin: 6px; | 垂直居中，水平两端对齐      |
| mid-around  | margin: 6px; | 垂直居中，水平 space-around |
| mid-evenly  | margin: 6px; | 垂直居中，水平 space-evenly |

# class 语法

## 特殊值语法

以下语法提供值不满足需求时，可用自定义值语法`[]`，如`color-[red]`，特殊值不会被配置项缩放值改变

## important

xxx-important 会自动生成`xxx !important`

## margin

| class | style                                | 解释 |
| :---- | :----------------------------------- | :--- |
| m-6   | margin: 6px;                         |
| m--6  | margin: -6px;                        | 负值 |
| mt-6  | margin-top: 6px;                     |
| mr-6  | margin-right: 6px;                   |
| mb-6  | margin-bottom: 6px;                  |
| ml-6  | margin-left: 6px;                    |
| mx-6  | margin-left: 6px; margin-right: 6px; |
| my-6  | margin-top: 6px; margin-bottom: 6px; |

## padding

| class | style                                  | 解释 |
| :---- | :------------------------------------- | :--- |
| p-6   | padding: 6px;                          |
| p--6  | padding: -6px;                         | 负值 |
| pt-6  | padding-top: 6px;                      |
| pr-6  | padding-right: 6px;                    |
| pb-6  | padding-bottom: 6px;                   |
| pl-6  | padding-left: 6px;                     |
| px-6  | padding-left: 6px; padding-right: 6px; |
| py-6  | padding-top: 6px; padding-bottom: 6px; |

## width

| class     | style            |
| :-------- | :--------------- |
| w-6       | width: 6px;      |
| w-full    | width: 100%;     |
| w-66p     | width: 66%;      |
| w-66vw    | width: 66vw;     |
| max-w-600 | max-width: 60px; |
| min-w-60  | min-width: 60px; |

## height

| class     | style            |
| :-------- | :--------------- |
| h-6       | height: 6px;     |
| h-full    | height: 100%;    |
| h-66p     | height: 66%;     |
| h-66vw    | height: 66vw;    |
| max-h-600 | max-width: 60px; |
| min-h-60  | min-width: 60px; |

## position

| class    | style               |
| :------- | :------------------ |
| static   | position: static;   |
| relative | position: relative; |
| absolute | position: absolute; |
| fixed    | position: fixed;    |
| sticky   | position: sticky;   |

## top-right-bottom-left

| class    | style        | 解释 |
| :------- | :----------- | :--- |
| top-6    | top: 6px;    |
| top--6   | top: -6px;   | 负值 |
| right-6  | right: 6px;  |
| bottom-6 | bottom: 6px; |
| left-6   | left: 6px;   |

## z-index

| class | style       |
| :---- | :---------- |
| z-6   | z-index: 6; |

## box-sizing

| class       | style                    |
| :---------- | :----------------------- |
| border-box  | box-sizing: border-box;  |
| content-box | box-sizing: content-box; |

## display

| class              | style                        |
| :----------------- | :--------------------------- |
| block              | display: block;              |
| inline             | display: inline;             |
| inline-block       | display: inline-block;       |
| flex               | display: flex;               |
| inline-flex        | display: inline-flex;        |
| inline-table       | display: inline-table;       |
| table-caption      | display: table-caption;      |
| table-cell         | display: table-cell;         |
| table-column       | display: table-column;       |
| table-column-group | display: table-column-group; |
| table-footer-group | display: table-footer-group; |
| table-row-group    | display: table-row-group;    |

## float

| class    | style         | 解释                                            |
| :------- | :------------ | :---------------------------------------------- |
| f-l      | float: left;  |                                                 |
| f-r      | float: right; |                                                 |
| float-xx | float: xx     | xx: none、left、right、inlineleft、inline-right |

## overflow

| class         | style                                 | 解释                                       |
| :------------ | :------------------------------------ | :----------------------------------------- |
| overflow-xx   | overflow: xx;                         | xx：visible、hidden、scroll、auto、overlay |
| overflow-x-xx | overflow-x: xx;                       | xx：visible、hidden、scroll、auto          |
| overflow-y-xx | overflow-y: xx;                       | xx：visible、hidden、scroll、auto          |
| scroll-x      | overflow-x: auto; overflow-y: hidden; |                                            |
| scroll-y      | overflow-x: hidden; overflow-y: auto; |                                            |

## visibility

| class         | style                | 解释                          |
| :------------ | :------------------- | :---------------------------- |
| visibility-xx | visibility: xx;      | xx：hidden、visible、collapse |
| visible       | visibility: visible; |                               |
| invisible     | visibility: hidden;  |                               |

## flex-direction

| class       | style                           | 解释                                                                                             |
| :---------- | :------------------------------ | :----------------------------------------------------------------------------------------------- |
| row         | flex-direction: row;            |
| col         | flex-direction: column;         |
| col-reverse | flex-direction: column-reverse; |
| flex-xx     | flex-direction: xx;             | xx：row、row-reverse、column、column-reverse、col（同 column）、col-reverse（同 column-reverse） |

## justify-content

| class                  | style                           | 解释                                                      |
| :--------------------- | :------------------------------ | :-------------------------------------------------------- |
| justify-xx             | justify-content: xx;            | xx：center、start、end、flex-start、flex-end、left、right |
| space-between、between | justify-content: space-between; |                                                           |
| space-around、around   | justify-content: space-around;  |                                                           |

## justify-items

| class            | style              | 解释                                                           |
| :--------------- | :----------------- | :------------------------------------------------------------- |
| justify-items-xx | justify-items: xx; | xx：center、startend、flex-start、flex-end、left、right、start |

## justify-self

| class           | style             | 解释                                  |
| :-------------- | :---------------- | :------------------------------------ |
| justify-self-xx | justify-self: xx; | xx：center 、 start 、 end 、stretcht |

## align-items

| class    | style            | 解释                                                               |
| :------- | :--------------- | :----------------------------------------------------------------- |
| items-xx | align-items: xx; | xx：center、start、end、flex-start、flex-end、self-start、self-end |

## align-content

| class      | style              | 解释                                         |
| :--------- | :----------------- | :------------------------------------------- |
| content-xx | align-content: xx; | xx：center、start、end、flex-start、flex-end |

## align-self

| class   | style           | 解释                                                                           |
| :------ | :-------------- | :----------------------------------------------------------------------------- |
| self-xx | align-self: xx; | xx：auto、normal、center、stretcht、self-start、self-end、flex-start、flex-end |

## flex-wrap

| class | style          | 解释                                    |
| :---- | :------------- | :-------------------------------------- |
| flex- | flex-wrap: xx; | xx 取值范围：wrap、wrap-reverse、nowrap |

## flex-grow-shrink

| class         | style           | 解释      |
| :------------ | :-------------- | :-------- |
| flex-1        | flex: 1 1 0%;   |           |
| flex-grow     | flex-grow: 1;   |           |
| flex-grow-x   | flex-grow: x;   | x：非负数 |
| flex-shrink   | flex-shrink: 1; |           |
| flex-shrink-x | flex-shrink: x; | x：非负数 |
| flex-none     | flex: 0 0 none; |           |
| flex-auto     | flex: 1 1 0%;   |           |

## order

| class   | style     |
| :------ | :-------- |
| order-6 | order: 6; |

## font-size

| class             | style           |
| :---------------- | :-------------- |
| font-size-6、fs-6 | font-size: 6px; |

## font-weight

| class                 | style          | 解释        |
| :-------------------- | :------------- | :---------- |
| font-weight-xx、fw-xx | font-size: xx; | xx：100~900 |

## font-family

| class                 | style            | 解释         |
| :-------------------- | :--------------- | :----------- |
| font-family-xx、ff-xx | font-family: xx; | xx：字体名称 |

## font-style

| class                | style               | 解释                        |
| :------------------- | :------------------ | :-------------------------- |
| font-style-xx、fs-xx | font-style: xx;     | xx：italic、oblique、normal |
| italic               | font-style: italic; |                             |

## letter-spacing

| class                     | style                | 解释         |
| :------------------------ | :------------------- | :----------- |
| ls-xx、letter-spaceing-xx | letter-spaceing: xx; | xx：任意数字 |

## line-height

| class                 | style              | 解释                            |
| :-------------------- | :----------------- | :------------------------------ |
| lh-xx、line-height-xx | letter-height: xx; | xx：如 1、1px、1rem，不会缩放值 |

## color

| class    | style       | 解释                                                      |
| :------- | :---------- | :-------------------------------------------------------- |
| color-xx | color: #xx; | xx：十六进制颜色值；注意不需要‘#’，如`#fff` 写`color-fff` |

## border

| class               | style                       | 解释                                                                                                       |
| :------------------ | :-------------------------- | :--------------------------------------------------------------------------------------------------------- |
| border-xx_yy_zzzz   | border: xx yy #zzzz;        | xx：border-width; <br/> yy：border-style; <br/>zzzz：十六进制颜色值；注意不需要‘#’，如`#fff` 写`color-fff` |
| border-t-xx_yy_zzzz | border-top: xx yy #zzzz;    | 同上                                                                                                       |
| border-r-xx_yy_zzzz | border-right: xx yy #zzzz;  | 同上                                                                                                       |
| border-b-xx_yy_zzzz | border-bottom: xx yy #zzzz; | 同上                                                                                                       |
| border-l-xx_yy_zzzz | border-left: xx yy #zzzz;   | 同上                                                                                                       |

## border-radius

| class                 | style                                                             |
| :-------------------- | :---------------------------------------------------------------- |
| round、radius-full    | border-radius: 100%                                               |
| r-xx、radius-xx       | border-radius: xxpx                                               |
| r-t-xx、radius-t-xx   | border-top-left-radius: xxpx; border-top-right-radius: xxpx       |
| r-b-xx、radius-b-xx   | border-bottom-left-radius: xxpx; border-bottom-right-radius: xxpx |
| r-tl-xx、radius-tl-xx | border-top-left-radius: xxpx                                      |
| r-tr-xx、radius-tr-xx | border-top-right-radius: xxpx                                     |
| r-bl-xx、radius-bl-xx | border-bottom-left-radius: xxpx                                   |
| r-br-xx、radius-br-xx | border-bottom-right-radius: xxpx                                  |

## border-width

> xx 表示两位数以内的数字，大于两位的数字编译为`border-color`，如需要可用自定义语法`border-[666]`设置

| class       | style                   |
| :---------- | :---------------------- |
| border-xx   | border-width: xx        |
| border-t-xx | border-top-width: xx    |
| border-r-xx | border-right-width: xx  |
| border-b-xx | border-bottom-width: xx |
| border-l-xx | border-left-width: xx   |

## border-color

> xxx 表示三位数以上的十六进制颜色值，两位数的数字会编译为`border-width`

| class      | style             | 解释                                                       |
| :--------- | :---------------- | :--------------------------------------------------------- |
| border-xxx | border-width: xxx | xxx：十六进制颜色值；注意不需要‘#’，如`#fff` 写`color-fff` |

## border-style

| class     | style            | 解释                                                                  |
| :-------- | :--------------- | :-------------------------------------------------------------------- |
| border-xx | border-style: xx | xx：none、dotted、dashed、solid、double、groove、ridge、inset、outset |

## opacity

> 设置值需要放大 100 倍，也就是值为 0~100

| class      | style        |
| :--------- | :----------- |
| opacity-50 | opacity: 0.5 |

## cursor

| class       | style               | 解释           |
| :---------- | :------------------ | :------------- |
| pointer     | cuosor：pointer     |                |
| not-allowed | cuosor：not-allowed |                |
| cursor-xx   | cuosor：xx          | xx：属性合法值 |

## user-select

| class     | style           | 解释                               |
| :-------- | :-------------- | :--------------------------------- |
| select-xx | user-select: xx | xx：none、auto、text、contain、all |

## list-style-type

| class   | style               | 解释                                    |
| :------ | :------------------ | :-------------------------------------- |
| list-xx | list-style-type: xx | xx：none、disc、circle、square、decimal |

## list-style-position

| class   | style                   | 解释                  |
| :------ | :---------------------- | :-------------------- |
| list-xx | list-style-position: xx | xx：inside、outsidel) |

## text-align

| class   | style               | 解释                                                  |
| :------ | :------------------ | :---------------------------------------------------- |
| t-l     | text-align: left;   |
| t-r     | text-align: right;  |
| t-c     | text-align: center; |
| text-xx | text-align: xx;     | left、right、center、justify、justify-all、start、end |

## text-decoration-line

| class         | style                               | 解释                                                  |
| :------------ | :---------------------------------- | :---------------------------------------------------- |
| underline     | text-decoration-line: underline;    |
| line-through  | text-decoration-line: line-through; |
| decoration-xx | text-decoration-line:xx;            | none、underline、overline、line-through、blink、unset |

## text-decoration-color

| class          | style                       | 解释                                                       |
| :------------- | :-------------------------- | :--------------------------------------------------------- |
| decoration-xxx | text-decoration-color: xxx; | xxx：十六进制颜色值；注意不需要‘#’，如`#fff` 写`color-fff` |

## 文本溢出显示为...

| class    | style                                                           |
| :------- | :-------------------------------------------------------------- |
| truncate | overflow: hidden; text-overflow: ellipsis; white-space: nowrap; |

## text-transform

| class      | style                      |
| :--------- | :------------------------- |
| capitalize | text-transform: capitalize |
| uppercase  | text-transform: uppercase  |
| lowercase  | text-transform: lowercase  |

## background-color

| class  | style                | 解释                                                       |
| :----- | :------------------- | :--------------------------------------------------------- |
| bg-xxx | background-color: xx | xxx：十六进制颜色值；注意不需要‘#’，如`#fff` 写`color-fff` |

## pointer-events

| class                | style                | 解释                                                                                                                 |
| :------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------- |
| pointer-events--xxxx | pointer-events: xxxx | auto、none、visiblePainted、visibleFill、visibleStroke、visible、painted、fill、stroke、all、inherit、initial、unset |

## box-shadow

| class                 | style                               | 解释 |
| :-------------------- | :---------------------------------- | :--- |
| shadow-6_6_dedede     | box-shadow: 6px 6px #dedede         |      |
| shadow-6_6_6_dedede   | box-shadow: 6px 6px 6px #dedede     |      |
| shadow-6_6_6_6_dedede | box-shadow: 6px 6px 6px 6px #dedede |      |

## animation-duration

| class        | style                     | 解释 |
| :----------- | :------------------------ | :--- |
| duration-666 | animation-duration: 666ms |      |

## animate-float

| class         | style                                                   | 解释                  |
| :------------ | :------------------------------------------------------ | :-------------------- |
| animate-float | animate-float: { animation: float 2s linear infinite; } | 动画循环上下浮动 15px |

## animate-ping

| class        | style                                                           | 解释             |
| :----------- | :-------------------------------------------------------------- | :--------------- |
| animate-ping | animate-float: { ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; } | 动画循环放大消失 |

## animate-spin

| class        | style                                       | 解释           |
| :----------- | :------------------------------------------ | :------------- |
| animate-ping | animate-float: { spin 2s linear infinite; } | 动画顺时针旋转 |

## animate-spin-reverse

| class        | style                                               | 解释           |
| :----------- | :-------------------------------------------------- | :------------- |
| animate-ping | animate-float: { spin-reverse 2s linear infinite; } | 动画逆时针旋转 |

---
