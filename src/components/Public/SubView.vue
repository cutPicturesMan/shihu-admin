<template>
  <div>
    <transition name="sub-view">
      <div class="sub-view" v-if="subViewToggle">
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
  import { mapState } from 'vuex';

  export default {
    computed: mapState(['subViewToggle']),
    methods: {
      // 关闭弹窗
      close () {
        this.$store.commit('CLOSE_SUB_VIEW');
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .sub-view {
    background-color: #fff;
    position: fixed;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 200px;
    z-index: 100;
    .go-back{
      cursor: pointer;
    }
  }

  .sub-view-enter-active {
    animation: slideRightIn .4s;
  }

  .sub-view-leave-active {
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
