<template>
  <div class="list">
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
