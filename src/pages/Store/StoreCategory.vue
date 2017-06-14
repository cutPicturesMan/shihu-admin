<template>
  <div class="store-category">
    <div class="pb15">
      <Button @click="subViewShow">新增分类</Button>{{count}}
    </div>
    <Table border :columns="columns" :data="list"></Table>
    <!--弹窗组件-->
    <subView :toggle="subViewToggle"
             @subViewClose="subViewClose">
      <!--新增、修改商家分类-->
      <StoreCategoryAdd
        :id="categoryId"
        :name="categoryName"
        @on-change-success="_getListData"></StoreCategoryAdd>
    </subView>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import configMap from '@/assets/js/config.js';
  import subView from '@/components/subView.vue';
  import StoreCategoryAdd from './StoreCategoryAdd.vue';

  export default {
    data () {
      return {
        // 需要修改的分类id
        categoryId: '',
        // 需要修改的分类名称
        categoryName: '',
        // 是否显示修改商家分类子组件
        subViewToggle: false,
        // 分类列表
        list: [],
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
                      this.categoryName = data.name || '';
                      this.categoryId = data._id || '';
                      this.subViewToggle = true;
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
                          console.log(url);
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
                            }).catch((e) => {
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
    computed: {
      count () {
        console.log(this.$store.state);
        return this.$store.state.count;
      }
    },
    methods: {
      // 请求数据
      _getListData () {
        this.$Loading.start();
        // 获取分类列表
        axios.get(configMap.storeCategory)
          .then((res) => {
            this.$Loading.finish();
            this.list = res.data;
          })
          .catch((e) => {
            this.$Loading.error();
            this.$Message.error('获取商家分类列表失败：' + e);
          });
      },
      // 新增商品分类
      subViewShow () {
        this.categoryId = '';
        this.categoryName = '';
        this.subViewToggle = true;
      },
      // 关闭商品分类组件
      subViewClose () {
        this.subViewToggle = false;
      }
    },
    components: {
      StoreCategoryAdd,
      subView
    },
    created () {
      // 请求分类数据
      this._getListData();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .store-category {
  }
</style>
