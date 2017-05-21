<template>
  <div id="app">
    <header class="app-header">
      头部 用户名 注册 | 登录
    </header>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
      <Row type="flex">
          <i-col :span="spanLeft" class="layout-menu-left">
            <Menu active-name="1" theme="dark" width="auto" accordion>
              <div class="layout-left-scale"> 
                <i-button type="text" @click="toggleClick">
                    <Icon type="navicon" size="32"></Icon>
                </i-button>
              </div>
              <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-home" :size="iconSize"></Icon>
                    <span class="submenu-title">商家中心</span>
                </template>
                <Menu-item name="1-1">
                  <Icon type="ios-list-outline"></Icon>
                  <span class="submenu-subtitle">商家列表</span>
                </Menu-item>
                <Menu-item name="1-2">
                  <Icon type="plus-circled"></Icon>
                  <span class="submenu-subtitle">新增商家</span>
                </Menu-item>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-nutrition" :size="iconSize"></Icon>
                  <span class="submenu-title">菜品中心</span>
                </template>
                <Menu-item name="2-1">
                  <Icon type="ios-list-outline"></Icon>
                  <span class="submenu-subtitle">菜品列表</span>
                </Menu-item>
                <Menu-item name="2-2">
                  <Icon type="ios-navigate"></Icon>
                  <span class="submenu-subtitle">新增菜品</span>
                </Menu-item>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="social-yen" :size="iconSize"></Icon>
                  <span class="submenu-title">订单中心</span>
                </template>
                <Menu-item name="3-1">
                  <Icon type="ios-list-outline"></Icon>
                  <span class="submenu-subtitle">订单列表</span>
                </Menu-item>
                <Menu-item name="3-2">
                  <Icon type="chatbubble-working"></Icon>
                  <span class="submenu-subtitle">订单评论</span>
                </Menu-item>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <Icon type="arrow-graph-up-right" :size="iconSize"></Icon>
                  <span class="submenu-title">数据分析</span>
                </template>
                <Menu-item name="4-1">
                  <router-link to="/analyze/platform" class="router-link">
                    <Icon type="android-cloud-outline"></Icon><span class="submenu-subtitle">平台分析</span>
                  </router-link>
                </Menu-item>
                <Menu-item name="4-2">
                  <router-link to="/analyze/merchant" class="router-link">
                    <Icon type="eye"></Icon><span class="submenu-subtitle">商家分析</span>
                  </router-link>
                </Menu-item>
              </Submenu>
              <Submenu name="5">
                <template slot="title">
                  <Icon type="locked" :size="iconSize"></Icon>
                  <span class="submenu-title">权限管理</span>
                </template>
                <Menu-item name="5-1">
                  <Icon type="ios-people"></Icon>
                  <span class="submenu-subtitle">管理员列表</span>
                </Menu-item>
                <Menu-item name="5-2">
                  <Icon type="ios-list-outline"></Icon>
                  <span class="submenu-subtitle">权限列表</span>
                </Menu-item>
              </Submenu>
            </Menu>
          </i-col>
          <i-col :span="spanRight">
            <router-view class="layout-content-main"></router-view>
            <div class="layout-copy">
                2017 &copy; by zhangzhen
            </div>
          </i-col>
      </Row>
    </div>
    <img src="./assets/logo.png">

    <router-view class="app-main"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      spanLeft: 5,
      spanRight: 19
    };
  },
  computed: {
    iconSize () {
      return this.spanLeft === 5 ? 14 : 24;
    }
  },
  methods: {
    toggleClick () {
      if (this.spanLeft === 5) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 5;
        this.spanRight = 19;
      }
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*margin-top: 60px;*/
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
.layout{
  /*border: 1px solid #d7dde4;*/
  background: #f5f7f9;
  position: relative;
  /*border-radius: 4px;*/
  overflow: hidden;

  position:fixed;
  top:$header-height;
  right:0;
  bottom:0;
  left:0;
}
.ivu-row-flex{
  min-height: 100%;
}
.layout-breadcrumb{
  /*padding: 10px 15px 0;*/
  padding-left: 15px;
}
.layout-content{
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-copy{
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left{
  background: #464c5b;
}
.layout-header{
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);

  display: flex;
  align-items: center;
}
.layout-left-scale{
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout-ceiling-main a{
  color: #9ba7b5;
}
.ivu-col{
  transition: width .2s ease-in-out;
}
.ivu-menu,
.ivu-menu-submenu{
  white-space: nowrap;
}
.layout-hide-text{
  .submenu-title,
  .ivu-menu-vertical .ivu-menu-submenu-title-icon,
  .submenu-subtitle{
    display: none;
  }
  .ivu-menu-submenu{
    text-align: center;
  }
  .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
    padding:14px 24px;
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
    .router-link{
      padding: 14px 24px;
      text-align: center;
      .ivu-icon{
        margin-right:0;
      }
    }  
  }
  .ivu-menu-submenu-title span>i, .ivu-menu-submenu-title>i{
    margin-right:0;
  }
}
.ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
  padding:0;
  padding-left: 0;
  .router-link{    
    padding: 14px 24px;
    padding-left: 43px;
    display: block;
    .ivu-icon{
      margin-right:6px;
    }
  }
}

.layout-menu-left{
  a{
    color:inherit;
    &:hover{
      color:#fff;
    }
  }
  .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
    padding:0;
    padding-left: 0;
  }
}
</style>
