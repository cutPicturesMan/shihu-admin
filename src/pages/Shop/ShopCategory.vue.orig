<template>
  <div class="store-category">
    <div class="btns-group">
      <Button-group class="pb15">
        <Button type="text" shape="circle" icon="plus-round" @click="subViewShow">新增</Button>
        <Button type="text" shape="circle" icon="edit">修改</Button>
        <Button type="text" shape="circle" icon="android-delete">删除</Button>
        <Button type="text" shape="circle" icon="android-refresh">刷新</Button>
        <Button type="text" shape="circle" icon="close-circled">取消选择</Button>
      </Button-group>
    </div>
    <Form :model="formItem" label-position="left" :label-width="60" inline>
      <Form-item label="分类名称">
        <Input v-model="formItem.input" placeholder="请输入名称"></Input>
      </Form-item>
      <Form-item label="创建日期">
        <Row>
          <Col span="11">
          <Date-picker type="date" placeholder="起始日期" v-model="formItem.date_from"></Date-picker>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
          <Date-picker type="date" placeholder="结束日期" v-model="formItem.date_to"></Date-picker>
          </Col>
        </Row>
      </Form-item>
      <Form-item>
        <Button type="primary" :loading="isSearching" @click="toLoading">
          <span v-if="!isSearching">查询</span>
          <span v-else>正在查询中...</span>
        </Button>
      </Form-item>
    </Form>

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
  import StoreCategoryAdd from './ShopCategoryAdd.vue';
  import utils from '@/assets/js/utils.js';
  import { mapState } from 'Vuex';

  export default {
    data () {
      return {
        // 是否正在查询中
        isSearching: false,
        // 查询字符串
        formItem: {
          input: '',
          date_from: '',
          date_to: ''
        },
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
      // 查询商品
      search () {
        this.isSearching = true;
      },
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
    .btns-group{
      margin-left: -15px;
    }
  }
</style>
