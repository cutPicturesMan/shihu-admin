<template>
  <div>
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
      <Form-item>
        <Button type="primary" @click="submit">提交</Button>
      </Form-item>
    </Form>
  </div>
</template>

<script type="text/ecmascript-6">
//  import axios from 'axios';
//  import configMap from '@/assets/js/config.js';

  export default {
    data () {
      let list = this.$store.state.StoreCategory.list;
      let id = this.$store.state.StoreCategory.id;

      let name = '';
      // 如果id不为空，表示修改
      if (id) {
        console.log('-----');
        // 根据id找出选择的是哪一条数据
        list.every((value) => {
          if (value._id === id) {
            name = value.name;
            return false;
          } else {
            return true;
          }
        });
      }

      return {
        form: {
          name: name || '',
          weight: 1,
          is_valid: true
        },
        rule: {
          name: {
            required: true, message: '分类名称不能为空', trigger: 'blur'
          }
        }
      };
    },
    methods: {
      // 新增、修改商家分类
      submit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 如果表单验证通过，则发送ajax
            if (valid) {
              this.$store.dispatch('StoreCategory/createOrUpdateItem', this.form);
            } else {
              this.$Message.error('表单验证失败');
            }
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
</style>
