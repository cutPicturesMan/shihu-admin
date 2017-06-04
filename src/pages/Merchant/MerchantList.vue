<template>
  <div>
    <DateTimePicker class="mb15"></DateTimePicker>
    <Table class="list-table mb15" border :columns="listColumns" :data="listData"></Table>
    <div class="page-container">
      <Page class="page-panel" :total="100" show-elevator show-total></Page>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import DateTimePicker from '@/components/DateTimePicker.vue';

  export default {
    data () {
      return {
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
      }
    },
    components: {
      DateTimePicker
    },
    created () {
      axios.get('/admin/merchant/list')
        .then((res) => {
          console.log(res);
        });
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
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
