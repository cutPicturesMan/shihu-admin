<template>
  <div class="list">
    <div class="layout-header">
      <div class="layout-breadcrumb">
          <Breadcrumb>
              <Breadcrumb-item href="#">首页</Breadcrumb-item>
              <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
              <Breadcrumb-item>某应用</Breadcrumb-item>
          </Breadcrumb>
          <button @click="print">打印路由</button>
      </div>
    </div>
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      title: '分析页'
    };
  },
  methods: {
    print () {
      console.log(this.$route);
    }
  }
};
</script>

<style>

</style>
