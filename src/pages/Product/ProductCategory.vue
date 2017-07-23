<template>
  <div class="store-category">
    <div class="ml-15">
      <Button-group class="pb15">
        <Button type="text" shape="circle" icon="plus-round" @click="createOrUpdateModelToggle = true">新增</Button>
        <Button type="text" shape="circle" icon="edit">修改</Button>
        <Button type="text" shape="circle" icon="android-delete">删除</Button>
        <Button type="text" shape="circle" icon="android-refresh">刷新</Button>
        <Button type="text" shape="circle" icon="close-circled">取消选择</Button>
      </Button-group>
    </div>
    <Form :model="searchObj" label-position="left" :label-width="60" inline>
      <Form-item label="分类名称">
        <Input v-model="searchObj.name" placeholder="请输入分类名称"></Input>
      </Form-item>
      <Form-item label="创建日期">
        <Row>
          <Col span="11">
          <Date-picker type="date" placeholder="起始日期" v-model="searchObj.date_from"></Date-picker>
          </Col>
          <Col span="2" style="text-align: center">
          -</Col>
          <Col span="11">
          <Date-picker type="date" placeholder="结束日期" v-model="searchObj.date_to"></Date-picker>
          </Col>
        </Row>
      </Form-item>
      <Form-item>
        <Button type="primary" :loading="isSearching" @click="search">
          <span v-if="!isSearching">查询</span>
          <span v-else>正在查询中...</span>
        </Button>
      </Form-item>
    </Form>

    <Table border :columns="columns" :data="list"></Table>

    <!--新增、修改商家分类-->
    <Modal v-model="createOrUpdateModelToggle" @on-ok="submit">
      <p slot="header">新增</p>
      <Form ref="form" :model="form" :rules="rule" :label-width="100">
        <Form-item label="分类名称" prop="name">
          <Input v-model="form.name" placeholder="请输入商品分类名称"></Input>
        </Form-item>
        <Form-item label="分类权重" prop="weight">
          <Input-number :max="10" :min="1" v-model="form.weight"></Input-number>
          <span class="text-stable">1~10，数值越高，显示越靠前</span>
        </Form-item>
        <Form-item label="是否显示该分类">
          <i-switch v-model="form.is_valid" size="large">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
          <span class="text-stable">默认开启，如果关闭则该分类下的所有菜品均不显示</span>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="createOrUpdateModelToggle = false">取消</Button>
        <Button type="primary" :loading="createOrUpdateLoading" @click="submit">
          <span v-if="!createOrUpdateLoading">提交</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import utils from '@/assets/js/utils.js';
  import { mapState, mapActions } from 'Vuex';

  export default {
    data () {
      let item = this.$store.state.ProductCategory.item;

      return {
        // 是否正在查询中
        isSearching: false,
        // 是否正在新增或者修改中
        createOrUpdateLoading: false,
        // 是否显示新增或者修改弹窗
        createOrUpdateModelToggle: false,
        // 查询字符串
        searchObj: {
          name: '',
          date_from: '',
          date_to: ''
        },
        form: {
          name: item.name || '',
          weight: 1,
          is_valid: true
        },
        rule: {
          name: {
            required: true, message: '分类名称不能为空', trigger: 'blur'
          }
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
    computed: mapState('ProductCategory', ['item', 'list']),
    methods: {
      ...mapActions('ProductCategory', ['getListData', 'createOrUpdateItem']),
      // 查询商品
      search () {
        this.isSearching = true;
        this.getListData();
      },
      // 新增、修改商家分类
      submit () {
        this.$refs.form.validate((valid) => {
          // 如果表单验证通过，则发送ajax
          if (valid) {
            // 禁用表单提交按钮
            this.createOrUpdateLoading = true;
            this.createOrUpdateItem(this.form).then(() => {
              this.createOrUpdateLoading = false;
            });
          } else {
            this.createOrUpdateLoading = false;
            this.$Message.error('表单验证失败');
          }
        });
      }
    },
    components: {},
    created () {
      // 请求商家分类数据
      this.getListData();
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .store-category {

  }
</style>
