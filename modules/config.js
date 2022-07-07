const config = {
  GOLBAL_FILE_NAME: "classtocss_global.css",
  LOCAL_CONF_NAME: "classtocss_config.json",
  GLOBAL_HEAD_DES: `/**\n* The classToCSS plugin automatically generates global style\n* Changes are invalid and will be overwritten\n*/\n`,
  APPLY_FILE_NAME: "classtocss_apply.css",
  APPLY_HEAD_DES: `/**\n* classToCSS Apply File\n* will automatically compile to classtocss_global.css file\n* example\n* .card {\n*    @apply .mt-20 .p-30 .radius-30 .shadow-0_0_20_#000;\n* }*/`,
}

module.exports = config
