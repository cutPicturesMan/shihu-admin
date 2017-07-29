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

    <!--新增/修改商家-->
    <MenuCreateOrUpdate
      :cuToggle.sync="cuToggle"></MenuCreateOrUpdate>
  </div>
</template>

<script type="text/ecmascript-6">
  import MenuCreateOrUpdate from './MenuCreateOrUpdate.vue';
  import MenuPage from './MenuPage.vue';
  import { mapState, mapMutations, mapActions } from 'Vuex';

  export default {
    data () {
      return {
        // 是否显示新增或者修改弹窗
        cuToggle: false,
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
            key: 'name',
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
                  }, params.row.name)]);
              } else {
                let indent = (params.row.id_path.split(',').length - 1) * 20;
                return h('span', {
                  style: {
                    marginLeft: indent + 'px'
                  }
                }, '└─' + params.row.name);
              }
            }
          },
          {
            title: '前端路由',
            key: 'url'
          },
          {
            title: '是否显示',
            key: 'state',
            width: 100,
            align: 'center',
            render: (h, params) => {
              if (params.row.state) {
                return h('Icon', {
                  props: {
                    type: 'checkmark'
                  }
                });
              } else {
                return h('Icon', {
                  props: {
                    type: 'close'
                  }
                });
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.moveItem({
                        _id: params.row._id,
                        parent_id: params.row.parent_id,
                        direction: -1
                      });
                    }
                  }
                }, '上移'),
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.moveItem({
                        _id: params.row._id,
                        parent_id: params.row.parent_id,
                        direction: 1
                      });
                    }
                  }
                }, '下移'),
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      console.log('添加子栏目');
                    }
                  }
                }, '添加子栏目'),
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log('编辑');
                    }
                  }
                }, '编辑')
              ]);
            }
          }
        ]
      };
    },
    computed: mapState('Menu', ['items', 'list']),
    methods: {
      ...mapMutations('Menu', ['SET_MENU_UPDATE_ITEM', 'SET_MENU_DELETE_ITEMS']),
      ...mapActions('Menu', ['test',
        'getListData',
        'createOrUpdateItem',
        'moveItem',
        'deleteItem',
        'deleteItems'
      ]),
      create () {
        this.SET_MENU_UPDATE_ITEM({});
        this.cuToggle = true;
      },
      // 表格选择
      select (selection) {
        this.SET_MENU_DELETE_ITEMS(selection);
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
