<template>
  <div class="store-category">
    <div class="pb15">
      <Button @click="subViewShow">新增分类</Button>
    </div>
    <Table border :columns="columns" :data="list"></Table>
    <!--弹窗组件-->
    <subView>
      <!--新增、修改商家分类-->
      <StoreCategoryAdd></StoreCategoryAdd>
    </subView>
  </div>
</template>

<script type="text/ecmascript-6">
  import SubView from '@/components/Public/SubView.vue';
  import StoreCategoryAdd from './Add.vue';
  import utils from '@/assets/js/utils.js';
  import { mapState } from 'Vuex';

  export default {
    data () {
      return {
        // table表头
        columns: [
          {
            title: '商家分类',
            key: 'name'
          },
          {
            title: '创建时间',
            key: 'createdAt',
            render: (h, params) => {
              let date = params.row.createdAt ? utils.formatDate(params.row.createdAt) : '';
              return h('div', date);
            }
          },
          {
            title: '修改时间',
            key: 'updatedAt',
            render: (h, params) => {
              let date = params.row.updatedAt ? utils.formatDate(params.row.updatedAt) : '';
              return h('div', date);
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
                      let data = this.list[params.index];
                      // 设置商品分类id为''
                      this.$store.commit('StoreCategory/SET_STORE_CATEGORY_ID', data._id);
                      // 显示页面
                      this.$store.commit('OPEN_SUB_VIEW');
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
                      let data = this.list[params.index];
                      let name = data.name || '';

                      this.$Modal.confirm({
                        title: '删除',
                        content: '<p>您确定要删除' + name + '吗？</p>',
                        loading: true,
                        onOk: () => {
                          this.$store.dispatch('StoreCategory/deleteItem', {
                            id: data._id,
                            index: params.index
                          });
                        }
                      });
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      };
    },
    computed: mapState('StoreCategory', ['id', 'list']),
    methods: {
      // 新增商品分类
      subViewShow () {
        // 设置商品分类id为''
        this.$store.commit('StoreCategory/SET_STORE_CATEGORY_ID');
        // 显示页面
        this.$store.commit('OPEN_SUB_VIEW');
      }
    },
    components: {
      StoreCategoryAdd,
      SubView
    },
    created () {
      // 请求商家分类数据
      this.$store.dispatch('StoreCategory/getListData');
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .store-category {
  }
</style>
