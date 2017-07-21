<template>
    <div>
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
      <Form-item label="商家分类" prop="name">
          <Input v-model="form.name" placeholder="请输入商家分类"></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="submit">提交</Button>
      </Form-item>
    </Form>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import configMap from '@/assets/js/config.js';

  export default {
    data () {
      // 商家分类异步验证
      const categoryValidate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入商家分类'));
        }

        // 查询名称是否重复
        axios.post(configMap.storeCategoryName, {
          name: this.form.name
        })
          .then((res) => {
            // 如果不重复，则进行下一步
            if (res.data.result === 1) {
              callback();
            } else {
              callback(new Error(res.data.msg));
            }
          })
          .catch((e) => {
            callback(new Error('查询失败：' + e));
          });
      };

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
          _id: id || '',
          name: name || ''
        },
        rule: {
          name: {
            validator: categoryValidate,
            trigger: 'submit'
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
