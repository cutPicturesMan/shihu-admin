<template>
  <div>
    <div class="app-spin" v-if="spinToggle">
      <Spin fix>
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';

  export default {
    computed: mapState(['spinToggle'])
  };
</script>

<style rel="stylesheet/scss"  lang="scss" type="text/scss">
  $base: 80px;
  .app-spin {
    width: $base;
    height: $base;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: - $base/2;
    margin-left: - $base/2;
    z-index: 10000;
    .ivu-spin{
      color:#fff;
      background-color: rgba(0, 0, 0, .7);
      border-radius: 5px;
    }
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>
