<template>
  <div>
    <div class="ml-15">
      <Button-group class="pb15">
        <Button type="text" shape="circle" icon="plus-round" @click="createOrUpdateModelToggle = true">新增</Button>
        <Button type="text" shape="circle" icon="edit">修改</Button>
        <Button type="text" shape="circle" icon="android-delete" @click="del">删除</Button>
        <Button type="text" shape="circle" icon="android-refresh" @click="getListData">刷新</Button>
        <Button type="text" shape="circle" icon="close-circled">取消选择</Button>
      </Button-group>
    </div>
    <!--查询-->
    <ShopQuery></ShopQuery>
    <!--表格-->
    <Table class="list-table mb15" border :columns="listColumns" :data="list"></Table>
    <!--分页-->
    <ShopPage></ShopPage>
    <!--新增/修改商家-->
    <ShopCreateOrUpdate
      :createOrUpdateModelToggle.sync="createOrUpdateModelToggle"></ShopCreateOrUpdate>
  </div>
</template>
<script type="text/ecmascript-6">
  import ShopCreateOrUpdate from './ShopCreateOrUpdate.vue';
  import ShopQuery from './ShopQuery.vue';
  import ShopPage from './ShopPage.vue';
  import utils from '@/assets/js/utils.js';
  import { mapState, mapActions } from 'Vuex';

  export default {
    data () {
      return {
        // 是否显示新增或者修改弹窗
        createOrUpdateModelToggle: false,
        listColumns: [
          {
            title: '店铺名称',
            key: 'name',
            className: 'shop-name',
            render: (h, params) => {
              return h('div', [
                h('Img', {
                  class: {
                    'shop-thumbnail': true
                  },
                  style: {
                    'margin-right': '10px',
                    'vertical-align': 'middle'
                  },
                  attrs: {
                    src: 'http://localhost:3000/' + params.row.logo_url.thumb_url
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '店铺分类',
            key: 'category'
          },
          {
            title: '门店地址',
            key: 'address_text'
          },
          {
            title: '简介',
            key: 'description'
          },
          {
            title: '创建时间',
            key: 'createdAt',
            render: (h, params) => {
              return h('div', utils.formatDate(new Date(params.row.createdAt), 'YYYY-MM-DD HH:mm:ss'));
            }
          },
          {
            title: '最近更新',
            key: 'updatedAt',
            render: (h, params) => {
              return h('div', utils.formatDate(new Date(params.row.updatedAt), 'YYYY-MM-DD HH:mm:ss'));
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      };
    },
    computed: mapState('Shop', ['item', 'list']),
    methods: {
      ...mapActions('Shop', ['test', 'getListData', 'createOrUpdateItem']),
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
        });
      },
      remove (index) {
        this.data6.splice(index, 1);
      },
      // 删除
      del () {
        console.log(this.query);
      },
      // 刷新
      refresh () {
        this.test('ttt').then((res) => {
          console.log('子级同意' + res);
        }, (res) => {
          console.log('子级拒绝' + res);
        });
      },
      // 提交表单
      submit () {
        this.$refs.form.validate((valid) => {
          // 如果表单验证通过，则发送ajax
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      }
    },
    components: {
      ShopQuery,
      ShopCreateOrUpdate,
      ShopPage
    },
    created () {
      // 请求商家列表数据
      this.getListData();
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .list-table {
    .shop-name {
      padding: 10px 0;
    }
    .shop-thumbnail {
      $w: 50px;
      width: $w;
      height: $w;
    }
  }
</style>
