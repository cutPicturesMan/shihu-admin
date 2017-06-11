<template>
  <div>
    <transition name="sub-view">
      <div class="sub-view" v-if="toggle">
        <div class="layout-header">
          <div class="layout-breadcrumb">
            <span class="go-back" @click="close">
              <Icon type="reply"></Icon>
              <span>关闭</span>
            </span>
          </div>
        </div>
        <div class="sub-view-container">
          <slot>
            <p class="p30 tac">暂无内容</p>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      // 弹窗开关
      toggle: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 关闭弹窗
      close () {
        this.$emit('subViewClose');
      }
    }
  };
</script>

<style rel="stylesheet/scss" type="text/scss">
  .sub-view {
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
  .sub-view-enter-active{
    animation: slideRightIn .4s;
  }
  .sub-view-leave-active{
    animation: slideRightOut .4s;
  }
  @keyframes slideRightIn {
    0% {
      transform: translate(100%, 0);
      opacity: 0;
    }
    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  @keyframes slideRightOut {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(100%, 0);
    }
  }
</style>
