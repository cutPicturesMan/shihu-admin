<template>
  <div>
    <div class="ml-15">
      <Button-group class="pb15">
        <Button type="text" shape="circle" icon="plus-round" @click="create">新增</Button>
        <Button type="text" shape="circle" icon="edit">修改</Button>
        <Button type="text" shape="circle" icon="android-delete" @click="deleteItems">批量删除</Button>
        <Button type="text" shape="circle" icon="android-refresh" @click="getListData">刷新</Button>
      </Button-group>
    </div>
    <!--表格-->
    <Table class="list-table mb15" border
           :columns="listColumns"
           :data="list"
           @on-selection-change="select"></Table>
    <!--分页-->
    <MenuPage></MenuPage>
  </div>
</template>

<script type="text/ecmascript-6">
  import MenuCreateOrUpdate from './MenuCreateOrUpdate.vue';
  import MenuPage from './MenuPage.vue';
  import { mapState, mapMutations, mapActions } from 'Vuex';

  export default {
    data () {
      return {
        listColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '栏目编号',
            key: '_id'
          },
          {
            title: '栏目名称',
            key: 'title',
            render: (h, params) => {
              // 如果是第一级栏目，则显示文件夹图标
              if (params.row.parent_id === 0) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'folder'
                    }
                  }),
                  h('span', {
                    style: {
                      marginLeft: '10px'
                    }
                  }, params.row.title)]);
              } else {
                return h('span', {
                  style: {
                    marginLeft: '20px'
                  }
                }, '└─' + params.row.title);
              }
            }
          },
          {
            title: '是否显示',
            key: 'state'
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
                      console.log('上移');
                    }
                  }
                }, '上移'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log('下移');
                    }
                  }
                }, '下移')
              ]);
            }
          }
        ]
      };
    },
    computed: mapState('Menu', ['items', 'list']),
    methods: {
      ...mapMutations('Menu', ['SET_SHOP_UPDATE_ITEM', 'SET_SHOP_DELETE_ITEMS']),
      ...mapActions('Menu', ['test',
        'getListData',
        'createOrUpdateItem',
        'deleteItem',
        'deleteItems'
      ]),
      create () {
        this.SET_SHOP_UPDATE_ITEM({});
        this.createOrUpdateModelToggle = true;
      },
      // 表格选择
      select (selection) {
        this.SET_SHOP_DELETE_ITEMS(selection);
      }
    },
    components: {
      MenuCreateOrUpdate,
      MenuPage
    },
    created () {
      // 请求栏目列表数据
      this.getListData();
    }
  };
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
