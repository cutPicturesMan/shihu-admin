<template>
  <div class="page-container">
    <Page class="page-panel"
          :total="total"
          :page-size-opts="[10, 20, 30]"
          @on-change="changePage"
          @on-page-size-change="changeLimit"
          show-sizer
          show-elevator
          show-total></Page>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState, mapMutations, mapActions } from 'Vuex';

  export default {
    state: {
      // 超时调用
      t: null
    },
    computed: mapState('Shop', ['total']),
    methods: {
      ...mapMutations('Shop', ['UPDATE_SHOP_QUERY']),
      ...mapActions('Shop', ['getListData']),
      // 改变页码
      changePage (data) {
        this.changeQuery({page: data});
      },
      // 改变每页显示的条数
      changeLimit (data) {
        this.changeQuery({limit: data});
      },
      // 改变分页后重新请求数据
      changeQuery (obj) {
        // 如果将limit设置的比较大，导致page变的比较小，会分别各触发一次changePage和changeLimit事件，导致请求2次，因此要先取消掉一次请求事件
        clearTimeout(this.t);
        setTimeout(() => {
          this.UPDATE_SHOP_QUERY(obj);
          this.getListData();
        }, 100);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
