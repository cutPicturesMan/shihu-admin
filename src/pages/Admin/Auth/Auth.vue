<template>
  <div>
    <div class="ml-15">
      <Button-group class="pb15">
        <Button type="text" shape="circle" icon="plus-round" @click="create">新增</Button>
        <Button type="text" shape="circle" icon="edit">修改</Button>
        <Button type="text" shape="circle" icon="android-delete" @click="deleteItems">批量删除</Button>
        <Button type="text" shape="circle" icon="android-refresh" @click="getListData">刷新</Button>
      </Button-group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {};
    }
  };
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
