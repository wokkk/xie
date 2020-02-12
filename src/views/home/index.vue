<template>
  <el-container>
    <el-header>
      <span class="header-txt">kevin 后台管理系统</span>
      <div>
        <span class="go-home">欢迎- {{userName}} 回来~</span>
        <el-button type="success" size="mini" round @click="backLogin">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
          <!-- 1级菜单 -->
          <el-submenu index="1">
            <!-- 1级菜单模板 -->
            <template slot="title">
              <!-- 1级菜单图标 -->
              <i class="el-icon-user-solid"></i>
              <!-- 1级菜单文本 -->
              <span>系统管理</span>
            </template>
            <!-- 2级菜单 -->
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i>用户管理</el-menu-item>
            <el-menu-item index="1-4-2"><i class="el-icon-menu"></i>角色管理</el-menu-item>
            <el-menu-item index="1-4-3"><i class="el-icon-menu"></i>菜单管理</el-menu-item>
            <el-menu-item index="1-4-4"><i class="el-icon-menu"></i>系统日志</el-menu-item>
          </el-submenu>
          <!-- 1级菜单 -->
          <el-submenu index="2">
            <!-- 1级菜单模板 -->
            <template slot="title">
              <!-- 1级菜单图标 -->
              <i class="el-icon-coin"></i>
              <!-- 1级菜单文本 -->
              <span>权限管理</span>
            </template>
            <!-- 2级菜单 -->
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i>订单管理</el-menu-item>
            <el-menu-item index="1-4-2"><i class="el-icon-menu"></i>订单状态分布</el-menu-item>
            <el-menu-item index="1-4-3"><i class="el-icon-menu"></i>订单费用汇总</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <!-- 1级菜单模板 -->
            <template slot="title">
              <!-- 1级菜单图标 -->
              <i class="el-icon-s-tools"></i>
              <!-- 1级菜单文本 -->
              <span>配置管理</span>
            </template>
            <!-- 2级菜单 -->
            <el-menu-item index="/product"><i class="el-icon-menu"></i>保险产品表</el-menu-item>
            <el-menu-item index="/companytable"><i class="el-icon-menu"></i>保险方案配置表</el-menu-item>
            <el-menu-item index="/companyconfig"><i class="el-icon-menu"></i>公司配置表</el-menu-item>
            <el-menu-item index="/configfunction"><i class="el-icon-menu"></i>配置关联功能</el-menu-item>
            <el-menu-item index="/pageconfig"><i class="el-icon-menu"></i>前端页面配置表</el-menu-item>
            <el-menu-item index="/system"><i class="el-icon-menu"></i>系统来源表</el-menu-item>
            <el-menu-item index="/payconfig"><i class="el-icon-menu"></i>支付配置表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <!-- 1级菜单模板 -->
            <template slot="title">
              <!-- 1级菜单图标 -->
              <i class="el-icon-location"></i>
              <!-- 1级菜单文本 -->
              <span>二维码管理</span>
            </template>
            <!-- 2级菜单 -->
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i>猎户座生成职团部二维码</el-menu-item>
            <el-menu-item index="1-4-2"><i class="el-icon-menu"></i>猎虎座生成HB二维码</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        data: "",
        userName:'',
      };
    },
    mounted(){
      this.getUserInfo()
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      backLogin() {
        // const _that = this;
        console.log(this)
        localStorage.removeItem('token')
        this.$router.replace({ name: 'login' })
      },
      getUserInfo(){
        this.userName = window.localStorage.getItem('userName')
      }
    }
  };
</script>

<style lang="less" scoped>
  body,
  html {
    height: 100%;
    width: 100%;
  }
  
  .el-container {
    height: 100vh;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    background-color: #333744;
  }

  .el-aside {
    background-color: #333744;
    color: #ffffff;
    /* height: 100%; */
    /* line-height: 200px; */
  }

  .el-main {
    background-color: #eaedf1;
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
  }

  .el-menu {
    border: 0px;
  }

  /* //折叠 */
  .isFold {
    color: #ffffff;
    height: 56px;
  }
  .header-txt{
    font-size: 18px;
  }
  .go-home{
    font-size: 16px;
    margin-right: 20px;
    color: orange;
  }
</style>