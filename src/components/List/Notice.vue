<template>
  <Button type="primary" @click="time">打开提醒</Button>
</template>
<script>
  export default {
    methods: {
      time () {
        this.$Notice.open({
          title: '这是通知标题',
          desc: '这条通知不会自动关闭，需要点击关闭按钮才可以关闭。',
          duration: 0
        });
      }
    }
  };
</script>
