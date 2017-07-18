<template>
  <div>
    <div class="ml-15">
      <Button-group class="pb15">
        <Button type="text" shape="circle" icon="plus-round" @click="createOrUpdateModelToggle = true">新增</Button>
        <Button type="text" shape="circle" icon="edit">修改</Button>
        <Button type="text" shape="circle" icon="android-delete">删除</Button>
        <Button type="text" shape="circle" icon="android-refresh">刷新</Button>
        <Button type="text" shape="circle" icon="close-circled">取消选择</Button>
      </Button-group>
    </div>
    <DateTimePicker class="mb15"></DateTimePicker>
    <Table class="list-table mb15" border :columns="listColumns" :data="listData"></Table>
    <div class="page-container">
      <Page class="page-panel" :total="100" show-elevator show-total></Page>
    </div>

    <!--新增/修改商家-->
    <shopCreateOrUpdate
      :createOrUpdateModelToggle.sync="createOrUpdateModelToggle"></shopCreateOrUpdate>
  </div>
</template>
<script type="text/ecmascript-6">
  import DateTimePicker from '@/components/Public/DateTimePicker.vue';
  import shopCreateOrUpdate from './shopCreateOrUpdate.vue';

  export default {
    data () {
      return {
        // 是否显示新增或者修改弹窗
        createOrUpdateModelToggle: false,
        listColumns: [
          {
            title: '商家名称',
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
                    src: 'http://img1.skqkw.cn:888/2014/11/20/12/gaygzb4mamk-72662.jpg'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '商家分类',
            key: 'type'
          },
          {
            title: '门店地址',
            key: 'address'
          },
          {
            title: '简介',
            key: 'info'
          },
          {
            title: '创建时间',
            key: 'create'
          },
          {
            title: '最近更新',
            key: 'update'
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
        ],
        listData: [
          {
            name: '王小明',
            type: 18,
            address: '北京市朝阳区芍药居',
            info: '药店啊啊啊啊啊啊',
            create: '2017-06-03 12:00:00',
            update: '2017-06-03 15:40:00'
          },
          {
            name: '张小刚',
            type: 25,
            address: '北京市海淀区西二旗',
            info: '药店啊啊啊啊啊啊',
            create: '2017-06-03 12:00:00',
            update: '2017-06-03 15:40:00'
          },
          {
            name: '李小红',
            type: 30,
            address: '上海市浦东新区世纪大道',
            info: '药店啊啊啊啊啊啊',
            create: '2017-06-03 12:00:00',
            update: '2017-06-03 15:40:00'
          },
          {
            name: '周小伟',
            type: 26,
            address: '深圳市南山区深南大道',
            info: '药店啊啊啊啊啊啊',
            create: '2017-06-03 12:00:00',
            update: '2017-06-03 15:40:00'
          }
        ]
      };
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
        });
      },
      remove (index) {
        this.data6.splice(index, 1);
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
      DateTimePicker,
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
