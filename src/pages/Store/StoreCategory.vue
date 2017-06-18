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
  import axios from 'axios';
  import configMap from '@/assets/js/config.js';
  import SubView from '@/components/Public/SubView.vue';
  import StoreCategoryAdd from './StoreCategoryAdd.vue';
  import { mapState, mapActions } from 'Vuex';

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
            key: 'meta',
            render: (h, params) => {
              return h('div', params.row.meta.create);
            }
          },
          {
            title: '修改时间',
            key: 'meta',
            render: (h, params) => {
              return h('div', params.row.meta.create);
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
                          // 删除分类
                          let url = configMap.storeCategory + '/' + data._id;

                          axios.delete(url)
                            .then((res) => {
                              this.$Modal.remove();
                              // 如果删除成功
                              if (res.data.result === 1) {
                                this.list.splice(params.index, 1);
                                this.$Message.success(res.data.msg);
                              } else {
                                this.$Message.error(res.data.msg);
                              }
                            })
                            .catch((e) => {
                              this.$Modal.remove();
                              this.$Message.error('操作失败：' + e);
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
      ...mapActions('StoreCategory', ['getListData']),
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
