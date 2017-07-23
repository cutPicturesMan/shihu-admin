<template>
  <div>
    <div class="ml-15">
      <Button-group class="pb15">
        <Button type="text" shape="circle" icon="plus-round" @click="createOrUpdateModelToggle = true">新增</Button>
        <Button type="text" shape="circle" icon="edit">修改</Button>
        <Button type="text" shape="circle" icon="android-delete">删除</Button>
        <Button type="text" shape="circle" icon="android-refresh" @click="getListData">刷新</Button>
        <Button type="text" shape="circle" icon="close-circled">取消选择</Button>
      </Button-group>
    </div>
    <Form :model="searchObj" label-position="left" :label-width="60" inline>
      <Form-item label="店铺名称">
        <Input v-model="searchObj.name" placeholder="店铺名称"></Input>
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
        <Button type="primary" :loading="isSearching" @click="getListData">
          <span v-if="!isSearching">查询</span>
          <span v-else>正在查询中...</span>
        </Button>
      </Form-item>
    </Form>
    <Table class="list-table mb15" border :columns="listColumns" :data="list"></Table>
    <div class="page-container">
      <Page class="page-panel" :total="100" show-elevator show-total></Page>
    </div>

    <!--新增/修改商家-->
    <shopCreateOrUpdate
      :createOrUpdateModelToggle.sync="createOrUpdateModelToggle"></shopCreateOrUpdate>
  </div>
</template>
<script type="text/ecmascript-6">
  import shopCreateOrUpdate from './shopCreateOrUpdate.vue';
  import utils from '@/assets/js/utils.js';
  import { mapState, mapActions } from 'Vuex';

  export default {
    data () {
      return {
        // 是否正在查询中
        isSearching: false,
        // 是否显示新增或者修改弹窗
        createOrUpdateModelToggle: false,
        listColumns: [
          {
            title: '店铺名称',
            key: 'name',
            className: 'merchant-name',
            render: (h, params) => {
              return h('div', [
                h('Img', {
                  class: {
                    'merchant-thumbnail': true
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
    computed: mapState('Shop', ['item', 'list', 'searchObj']),
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
      shopCreateOrUpdate
    },
    created () {
      // 请求商家列表数据
      this.getListData();
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .list-table {
    .merchant-name {
      padding: 10px 0;
    }
    .merchant-thumbnail {
      $w: 50px;
      width: $w;
      height: $w;
    }
  }
</style>
