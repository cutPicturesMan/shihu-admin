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
        <Form-item label="门店名称" prop="name">
          <Row>
            <Col span="7">
            <Input v-model="form.name" placeholder="请输入门店名称"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="门店分类" prop="category">
          <Row>
            <Col span="7">
            <Select v-model="form.category" placeholder="请选择门店分类">
              <Option :value="item.value" v-for="item in category_list" :key="item.label" v-text="item.label"></Option>
            </Select>
            </Col>
            <Col span="15" offset="1">
            </Col>
          </Row>
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
  import { mapState, mapActions } from 'Vuex';

  // 表单默认值
  let form = {
    // 店铺名称
    name: '测试1',
    category: '1'
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
          name: {required: true, message: '门店名称不能为空'},
          category: {required: true, message: '请选择商家分类'}
        },
        // 分类列表
        category_list: [{
          value: '1',
          label: '酒水饮料'
        }, {
          value: '2',
          label: '甜品奶茶'
        }, {
          value: '3',
          label: '正餐'
        }, {
          value: '4',
          label: '火锅'
        }]
      };
    },
    computed: mapState('Menu', ['item']),
    methods: {
      ...mapActions('Menu', ['createOrUpdateItem']),
      // 关闭弹窗
      close () {
        this.$emit('update:cuToggle', false);
      },
      // 提交表单
      submit () {
        this.$refs.form.validate((valid) => {
          // 如果表单验证通过，则发送ajax
          if (valid) {
            let logoUrl = this.form.logo;
            let photoList = [];
            // 从logo中取出url、thumb_url字段
            this.form.logo = {
              url: logoUrl.url,
              thumb_url: logoUrl.thumb_url
            };

            // 从店铺图片列表中提取出url、thumb_url字段
            this.form.photo_list.forEach((item) => {
              photoList.push({
                url: item.url,
                thumb_url: item.thumb_url
              });
            });
            this.form.photo_list = photoList;

            // 如果营业时间没有选满7天，则返回
            let servingLength = 0;
            this.form.serving_time.forEach((item) => {
              servingLength += item.day.length;
            });
            if (servingLength !== 7) {
              return this.$Message.error('营业时间段未全部选择!');
            }

            // 提交
            this.createOrUpdateItem(this.form).then(() => {
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
