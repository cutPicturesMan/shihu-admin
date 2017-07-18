<template>
  <div id="app">
    <header class="app-header">
      头部 用户名 注册 | 登录
    </header>
    <div class="layout" :class="{'layout-hide-text': layoutHide}">
      <Row type="flex">
          <!-- 左侧导航 -->
          <i-col class="layout-menu-left">
            <Menu active-name="1" theme="dark" width="auto" accordion>
              <div class="layout-left-scale">
                <i-button type="text" @click="toggleClick">
                    <Icon type="navicon" size="32"></Icon>
                </i-button>
              </div>
              <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-home" :size="iconSize"></Icon>
                    <span class="submenu-title">店铺中心</span>
                </template>
                <Menu-item name="1-1">
                  <router-link to="/shop/category" class="router-link">
                    <Icon type="grid"></Icon>
                    <span class="submenu-subtitle">店铺分类</span>
                  </router-link>
                </Menu-item>
                <Menu-item name="1-2">
                  <router-link to="/shop/list" class="router-link">
                    <Icon type="android-list"></Icon>
                    <span class="submenu-subtitle">店铺列表</span>
                  </router-link>
                </Menu-item>
                <Menu-item name="1-3">
                  <router-link to="/store/category" class="router-link">
                    <Icon type="grid"></Icon>
                    <span class="submenu-subtitle">店铺分类</span>
                  </router-link>
                </Menu-item>
                <Menu-item name="1-4">
                  <router-link to="/shop/shop_add" class="router-link">
                    <Icon type="plus-circled"></Icon>
                    <span class="submenu-subtitle">新增分类</span>
                  </router-link>
                </Menu-item>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-nutrition" :size="iconSize"></Icon>
                  <span class="submenu-title">商品中心</span>
                </template>
                <Menu-item name="2-1">
                  <router-link to="/product/product" class="router-link">
                    <Icon type="android-list"></Icon>
                    <span class="submenu-subtitle">商品列表</span>
                  </router-link>
                </Menu-item>
                <Menu-item name="2-2">
                  <router-link to="/product/category" class="router-link">
                    <Icon type="ios-navigate"></Icon>
                    <span class="submenu-subtitle">商品分类</span>
                  </router-link>
                </Menu-item>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="social-yen" :size="iconSize"></Icon>
                  <span class="submenu-title">订单中心</span>
                </template>
                <Menu-item name="3-1">
                  <router-link to="/analyze/shop" class="router-link">
                    <Icon type="ios-list-outline"></Icon>
                    <span class="submenu-subtitle">订单列表</span>
                  </router-link>
                </Menu-item>
                <Menu-item name="3-2">
                  <router-link to="/analyze/shop" class="router-link">
                    <Icon type="chatbubble-working"></Icon>
                    <span class="submenu-subtitle">订单评论</span>
                  </router-link>
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
                  <router-link to="/analyze/shop" class="router-link">
                    <Icon type="eye"></Icon><span class="submenu-subtitle">店铺分析</span>
                  </router-link>
                </Menu-item>
                <Menu-item name="4-3">
                  <router-link to="/analyze" class="router-link">
                    <Icon type="eye"></Icon><span class="submenu-subtitle">总览</span>
                  </router-link>
                </Menu-item>
              </Submenu>
              <Submenu name="5">
                <template slot="title">
                  <Icon type="locked" :size="iconSize"></Icon>
                  <span class="submenu-title">权限管理</span>
                </template>
                <Menu-item name="5-1">
                  <router-link to="/analyze/shop" class="router-link">
                    <Icon type="ios-people"></Icon>
                    <span class="submenu-subtitle">管理员列表</span>
                  </router-link>
                </Menu-item>
                <Menu-item name="5-2">
                  <router-link to="/analyze/shop" class="router-link">
                    <Icon type="ios-list-outline"></Icon>
                    <span class="submenu-subtitle">权限列表</span>
                  </router-link>
                </Menu-item>
              </Submenu>
            </Menu>
          </i-col>
          <!-- 右侧主体 -->
          <i-col class="layout-menu-right">
            <!-- 面包屑导航 -->
            <div class="layout-header">
              <div class="layout-breadcrumb">
                <BreadCrumb></BreadCrumb>
              </div>
            </div>
            <!-- 主体内容 -->
            <router-view class="layout-content-main"></router-view>
            <!-- 底部 -->
            <div class="layout-copy">
                2017 &copy; by zhangzhen
            </div>
          </i-col>
      </Row>
    </div>
    <!--加载框-->
    <Spin></Spin>
  </div>
</template>

<script type="text/ecmascript-6">
// 面包屑导航
import BreadCrumb from '@/components/Public/BreadCrumb';
import Spin from '@/components/Public/Spin';

export default {
  data () {
    return {
      layoutHide: false
    };
  },
  computed: {
    iconSize () {
      return this.layoutHide ? 24 : 14;
    }
  },
  components: {
    BreadCrumb,
    Spin
  },
  methods: {
    toggleClick () {
      this.layoutHide = !this.layoutHide;
    }
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
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
  padding: 15px;
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
  border-bottom: 1px solid rgba(0,0,0,.1);
  font-size:14px;

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

.layout {
  // 主体
  .ivu-row-flex {
    position: relative;
    $w: 200px;
    .layout-menu-left,
    .layout-menu-right {
      position: absolute;
      top: 0;
      bottom: 0;
      transition: all .2s ease-in-out;
    }
    // 左面板
    .layout-menu-left {
      width: $w;
      left: 0;
      overflow: hidden;
      a {
        color: inherit;
        &:hover {
          color: #fff;
        }
      }
    }
    // 右面板
    .layout-menu-right {
      right: 0;
      left: $w;
      overflow-x:hidden;
      overflow-y:scroll;
    }
    .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
      padding: 0;
      padding-left: 0;
    }
  }
  // 左面板最小化
  &.layout-hide-text {
    .ivu-row-flex{
      $w: 80px;
      .layout-menu-left {
        width: $w;
      }
      .layout-menu-right {
        left: $w;
      }
    }
  }
  // 分页右对齐
  .page-container{
    overflow: hidden;
    .page-panel{
      float: right;
    }
  }
  .ivu-input{
    /*width: auto;*/
  }
}

</style>
