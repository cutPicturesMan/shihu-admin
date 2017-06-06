<template>
  <div class="list">
    {{title}}
    <Notice></Notice>
  </div>
</template>

<script type="text/ecmascript-6">
  import Notice from '@/components/List/Notice.vue';

  export default {
    name: 'list',
    data () {
      return {
        title: '分类'
      };
    },
    components: {
      Notice
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .list {
  }
</style>
