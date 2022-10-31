const config = {
  GOLBAL_FILE_NAME: "classtocss_global.css",
  LOCAL_CONF_NAME: "classtocss_config.json",
  APPLY_FILE_NAME: "classtocss_apply.css",
  GLOBAL_HEAD_DES: `/**
 * classToCSS插件自动生成的全局样式，任何手动修改都会被覆盖
 * 需要手动引入到全局生效的位置，如index.html
 */\n`,
  APPLY_HEAD_DES: `/**
 * classToCSS插件生成的apply样式文件
 * 将会自动编译至classtocss_global.css文件中
 * 根据需要自行编辑，不会被覆盖
 */
/* 预设重置样式代码 */
.app-reset {
  @apply .p-0 .m-0 .content-box;
}
/* 预设垂直居中（flex） */
.mid {
  @apply .flex .items-center;
}
/* 预设水平居中（flex） */
.center {
  @apply .flex .justify-center;
}
/* 预设水平垂直居中（flex） */
.mid-center {
  @apply .flex .justify-center .items-center;
}
/* 预设水平两端对齐、垂直居中（flex） */
.mid-between {
  @apply .flex .justify-between .items-center;
}
/* 预设水平平均分布、垂直居中（flex） */
.mid-around {
  @apply .flex .justify-around .items-center;
}
/* 预设水平平均分布、垂直居中（flex） */
.mid-evenly {
  @apply .flex .justify-evenly .items-center;
}`,
}

module.exports = config
