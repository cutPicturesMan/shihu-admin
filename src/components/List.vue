<template>
  <div class="list">
    {{title}}
    <strong v-text="text"></strong>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 2500
    },
    text: {
      type: String
    }
  },
  name: 'list',
  data () {
    return {
      title: '列表页'
    };
  },
  mounted () {
    setTimeout(() => {
      console.log('插件');
    }, this.duration);
  }
};
</script>

<style>

</style>
