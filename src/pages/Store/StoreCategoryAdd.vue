<template>
  <div>
    <Form class="pt50" ref="form" :model="form" :rules="rule" :label-width="180">
      <Form-item label="商家分类" prop="name">
        <Row>
          <Col span="5">
          <Input v-model="form.name" placeholder="请输入商家分类"></Input>
          </Col>
        </Row>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="submit">提交</Button>
      </Form-item>
    </Form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
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

      return {
        form: {
          _id: this.id || '',
          name: this.name || ''
        },
        rule: {
          name: {
            validator: categoryValidate,
            trigger: 'submit'
          }
        }
      };
    },
    computed: {
      ...mapState('StoreCategory', ['id']),
      // 条目名称
      name () {
        let list = this.$store.storeCategory.list;
        let id = this.$store.storeCategory.id;
        let name = '';

        // 如果id为空，表示新增
        if (id) {
          return name;
        } else {
          // 根据id找出选择的是哪一条数据
          list.every((value) => {
            if (value._id === id) {
              name = value.name;
              return false;
            } else {
              return true;
            }
          });

          return name;
        }
      }
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
