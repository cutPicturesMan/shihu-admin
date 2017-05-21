<template>
  <div id="app">
    <header class="app-header">
      头部 用户名 注册 | 登录
    </header>
    <div class="app-sidebar">
      <div class="sidebar-item">
        <a href="#/">首页</a>
      </div>
      <div class="sidebar-item">
        <a href="#/list">菜品分类</a>
      </div>
      <div class="sidebar-item">
        商户管理
          -新增商户
          -修改商户
      </div>
      <div class="sidebar-item">
        <router-link to="/analyze">数据分析</router-link>
      </div>
      <div class="sidebar-item">
        账号管理
      </div>
    </div>
    <img src="./assets/logo.png">

    <router-view class="app-main"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
$header-height: 50px;
$sidebar-width: 200px;
.app-header{
  height:$header-height;
  background-color: #000;
  color:#fff;
  display: flex;
  align-items: center;

  position:fixed;
  top:0;
  right:0;
  left:0;
}
.app-sidebar{
  width:$sidebar-width;
  background-color: #333744;
  color:#fff;

  position:fixed;
  top:$header-height;
  bottom:0;
  left:0;
}
.app-main{
  background-color: #eee;

  position:fixed;
  top:$header-height;
  right:0;
  bottom:0;
  left:$sidebar-width;
}
</style>