<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="less">
  #app,body,html {
    height: 100%;
    width: 100%;
    min-width:1024px;
  }
 *{
   margin: 0;
   padding: 0;
 }
 a{
   text-decoration: none;
 }
 .el-main{
  min-width:1150px;
 }
 /* 面包屑样式 */
 .el-breadcrumb{
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 16px;
    }
    /* 弹框字体 */
  /deep/.el-form-item__label{
     color: #000000;
     font-size: 14px;
  }
</style>
