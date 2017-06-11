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
        <Button type="ghost" style="margin-left: 8px">重置</Button>
      </Form-item>
    </Form>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import configMap from '@/assets/js/config.js';

  export default {
    props: {
      // 商家分类id
      id: {
        type: String,
        default: ''
      },
      // 商家分类名称
      name: {
        type: String,
        default: ''
      }
    },
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
    methods: {
      // 新增、修改商家分类
      submit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 如果表单验证通过，则发送ajax
            if (valid) {
              this.$Loading.start();
              let url = '';
              let q = null;
              // 如果id存在，表示是修改
              if (this.form._id) {
                url = `${configMap.storeCategory}/${this.form._id}`;
                q = axios.put(url, {
                  name: this.form.name
                });
              } else {
                // 否则，表示新增
                url = configMap.storeCategory;
                q = axios.post(url, {
                  name: this.form.name
                });
              }

              q.then((res) => {
                this.$Loading.finish();
                // 成功
                if (res.data.result === 1) {
                  this.$Message.success(res.data.msg);
                } else {
                  this.$Message.error(res.data.msg);
                }
              })
                .catch((e) => {
                  this.$Loading.error();
                  this.$Message.error('操作失败：' + e);
                });
            } else {
              this.$Message.error('表单验证失败');
            }
          }
        });
      }
    },
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
</style>
