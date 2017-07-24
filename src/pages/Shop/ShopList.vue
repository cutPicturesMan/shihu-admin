<template>
  <div>
    <div class="ml-15">
      <Button-group class="pb15">
        <Button type="text" shape="circle" icon="plus-round" @click="createOrUpdateModelToggle = true">新增</Button>
        <Button type="text" shape="circle" icon="edit">修改</Button>
        <Button type="text" shape="circle" icon="android-delete" @click="remove">删除</Button>
        <Button type="text" shape="circle" icon="android-refresh" @click="getListData">刷新</Button>
      </Button-group>
    </div>
    <!--查询-->
    <ShopQuery></ShopQuery>
    <!--表格-->
    <Table class="list-table mb15" border
           :columns="listColumns"
           :data="list"
           @on-selection-change="select"></Table>
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
  import { mapState, mapMutations, mapActions } from 'Vuex';

  export default {
    data () {
      return {
        // 删除
        // 是否显示新增或者修改弹窗
        createOrUpdateModelToggle: false,
        listColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '店铺名称',
            key: 'name'
          },
          {
            title: '店铺logo',
            key: 'logo_url',
            className: 'shop-name',
            render: (h, params) => {
              return h('Img', {
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
              });
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
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      //                      let shop = params.row;
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      };
    },
    computed: mapState('Shop', ['items', 'list']),
    methods: {
      ...mapMutations('Shop', ['SET_SHOP_ITEMS']),
      ...mapActions('Shop', ['test', 'getListData', 'createOrUpdateItem', 'removeItems']),
      // 表格选择
      select (selection) {
        this.SET_SHOP_ITEMS(selection);
      },
      // 删除
      remove () {
        console.log(this.removeItems());
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
