<template>
  <div class="">
    <Form-item
      label="门店电话"
      v-for="(item, index) in form.tells"
      :key="item"
      :required="true"
      :prop="'tells.' + index + '.tell'"
      :rules="{required: true, message: '门店电话不能为空', trigger: 'blur'}">
      <Row>
        <Col span="5">
        <Input v-model="item.tell" placeholder="请输入门店联系方式"></Input>
        </Col>
        <Col span="15" offset="1">
        <Button type="ghost" @click="removeTell(index)" v-if="form.tells.length > 1">删除</Button>
        </Col>
      </Row>
    </Form-item>
    <Form-item>
      <Row>
        <Col span="5">
        <Button type="dashed" long @click="addTell" icon="plus-round">新增门店电话</Button>
        </Col>
      </Row>
    </Form-item>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      // 表单数据
      form: {
        type: Object,
        required: true
      }
    },
    methods: {
      // 新增联系方式
      addTell () {
        this.form.tells.push({
          value: ''
        });
      },
      // 移除联系方式
      removeTell (index) {
        if (this.form.tells.length === 1) {
          return this.$Message.warning('至少填写一个门店电话');
        }
        this.form.tells.splice(index, 1);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">

</style>
