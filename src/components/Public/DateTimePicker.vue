<template>
  <Row type="flex" align="middle">
    商家名称：
    <Col span="5" class="mr15">
      <Input v-model="filterName" placeholder="请输入商家名称">
        <Select v-model="select1" slot="prepend" style="width: 80px">
          <Option value="全部">全部</Option>
          <Option value="粥粉面">粥粉面</Option>
          <Option value="甜品饮料">甜品饮料</Option>
          <Option value="汉堡炸鸡">汉堡炸鸡</Option>
        </Select>
      </Input>
    </Col>
    创建日期：
    <Col span="4" class="mr15">
      <Date-picker type="daterange" :options="dateOptions" placement="bottom-end" placeholder="选择日期" style="width:100%;"></Date-picker>
    </Col>

    <Button class="mr5" type="ghost" :loading="searchLoading" icon="ios-search" @click="search">
      <span v-if="!searchLoading">搜索</span>
      <span v-else>Loading...</span>
    </Button>
    <Button type="ghost">新增商家</Button>
  </Row>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        select1: '全部',
        // 查询名称
        filterName: '',
        // 是否正在进行查询
        searchLoading: false,
        // 是否正在进行删除
        deleteLoading: false,
        // 日期控件选项
        dateOptions: {
          shortcuts: [
            {
              text: '最近一周',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '最近一个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '最近三个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        }
      };
    },
    methods: {
      search () {
        this.searchLoading = true;
      }
    }
  };
</script>
<style   lang="scss" type="text/scss" rel="stylesheet/scss"  lang="scss" type="text/scss">

</style>
