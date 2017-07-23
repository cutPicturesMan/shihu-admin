<template>
  <div>
    <Form :model="query" label-position="left" :label-width="60" inline>
      <Form-item label="店铺名称">
        <Input :value="query.name" @on-blur="changeName" placeholder="店铺名称"></Input>
      </Form-item>
      <Form-item label="创建日期">
        <Row>
          <Col span="11">
          <Date-picker type="date" placeholder="起始日期" :value="query.date_from" @on-change="changeDateFrom"></Date-picker>
          </Col>
          <Col span="2" style="text-align: center">
          -</Col>
          <Col span="11">
          <Date-picker type="date" placeholder="结束日期" :value="query.date_to" @on-change="changeDateTo"></Date-picker>
          </Col>
        </Row>
      </Form-item>
      <Form-item>
        <Button type="primary" :loading="isSearching" @click="getListData">
          <span v-if="!isSearching">查询</span>
          <span v-else>正在查询中...</span>
        </Button>
      </Form-item>
    </Form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState, mapMutations, mapActions } from 'Vuex';

  export default {
    data () {
      return {
        // 是否正在查询中
        isSearching: false
      };
    },
    computed: mapState('Shop', ['query']),
    methods: {
      ...mapMutations('Shop', ['UPDATE_SHOP_QUERY']),
      ...mapActions('Shop', ['getListData']),
      // 改变名字
      changeName (e) {
        this.changeQuery({name: e.target.value});
      },
      // 改变起始时间
      changeDateFrom (time) {
        this.changeQuery({date_from: time});
      },
      // 改变结束时间
      changeDateTo (time) {
        this.changeQuery({date_to: time});
      },
      changeQuery (obj) {
        this.UPDATE_SHOP_QUERY(obj);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
