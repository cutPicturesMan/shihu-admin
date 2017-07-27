<template>
  <div class="pt50">
    <Modal
      :width="800"
      :value="cuToggle"
      @on-ok="submit"
      @on-cancel="close">
      <p slot="header">新增栏目</p>
      <transition name="fade">
        <Form ref="form" :model="form" :rules="rule" :label-width="180">
          <Form-item label="栏目名称" prop="name">
            <Row>
              <Col span="12">
              <Input v-model="form.name" placeholder="请输入栏目名称"></Input>
              </Col>
            </Row>
          </Form-item>
          <Form-item label="上级栏目" prop="parent_id">
            <Row>
              <Col span="12">
              <Select v-model="form.parent_id" placeholder="请选择上级栏目">
                <Option :value="item._id" v-for="item in menu_tree" :key="item._id" v-text="item.name"></Option>
              </Select>
              </Col>
              <Col span="7" offset="1">
              </Col>
            </Row>
          </Form-item>
          <Form-item label="链接地址" prop="url">
            <Row>
              <Col span="12">
              <Input v-model="form.url" placeholder="请输入链接地址"></Input>
              </Col>
            </Row>
          </Form-item>
          <Form-item label="是否显示">
            <i-switch v-model="form.state">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
            <span class="text-stable">
          如果选择否，则该栏目下的所有栏目全部不显示
        </span>
          </Form-item>
        </Form>
      </transition>
      <div slot="footer">
        <Button type="ghost" @click="close">取消</Button>
        <Button type="primary" :loading="isLoading" @click="submit">
          <span v-if="!isLoading">提交</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import _ from 'lodash';
  import { mapState, mapActions } from 'Vuex';

  // 表单默认值
  let form = {
    // 店铺名称
    name: '后台管理1',
    parent_id: 0,
    // 栏目对应的前端路由，可不填
    url: '/admin/menu',
    // 该栏目是否显示，如果不显示，则子级栏目全部不显示
    state: true
  };

  export default {
    props: {
      // 显示隐藏开关
      cuToggle: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // 是否正在新增或者修改中
        isLoading: false,
        // 需要提交的表单数据
        form: form,
        // 表单验证规则
        rule: {
          name: {required: true, message: '栏目名称不能为空'},
          parent_id: {required: true, message: '请选择相对应的上级栏目'}
        }
      };
    },
    computed: {
      ...mapState('Menu', ['item', 'list']),
      // 将目录列表中的name加上相应的└─
      menu_tree () {
        // 无上级栏目
        let root = {
          _id: 0,
          name: '无上级栏目',
          id_path: ''
        };
        // 目录列表
        let menuList = _.cloneDeep(this.list);
        menuList.forEach(item => {
          // 如果是非根栏目，才需要加上└─
          if (item.parent_id !== 0) {
            let length = item.id_path.split(',').length;
            let line = '';
            for (let i = 1; i < length; i++) {
              line += '　　';
            }
            item.name = `${line}└─${item.name}`;
          }
        });

        menuList.unshift(root);
        return menuList;
      }
    },
    methods: {
      ...mapActions('Menu', [
        'getListData',
        'createOrUpdateItem'
      ]),
      // 关闭弹窗
      close () {
        this.$emit('update:cuToggle', false);
      },
      // 提交表单
      submit () {
        this.$refs.form.validate((valid) => {
          // 如果表单验证通过，则发送ajax
          if (valid) {
            let form = _.cloneDeep(this.form);
            // 找到目录树中选择的上级栏目的_id，将该_id写入到id_path中
            this.menu_tree.every(item => {
              if (item._id === form.parent_id) {
                form.id_path = item.id_path;
                return false;
              } else {
                return true;
              }
            });

            // 提交
            this.createOrUpdateItem(form).then(() => {
              this.close();
            }, res => {});
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">

</style>
