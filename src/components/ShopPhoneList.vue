<template>
  <div class="">
    <Form-item
      label="门店电话"
      v-for="(item, index) in form.phone_list"
      :key="item"
      :required="true"
      :prop="'phone_list.' + index + '.phone'"
      :rules="{required: true, message: '门店电话不能为空', trigger: 'blur'}">
      <Row>
        <Col span="7">
        <Input v-model="item.phone" placeholder="请输入门店联系方式"></Input>
        </Col>
        <Col span="15" offset="1">
        <Button type="ghost" @click="removePhone(index)" v-if="form.phone_list.length > 1">删除</Button>
        </Col>
      </Row>
    </Form-item>
    <Form-item>
      <Row>
        <Col span="5">
        <Button type="dashed" long @click="addPhone" icon="plus-round">新增门店电话</Button>
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
      addPhone () {
        this.form.phone_list.push({
          phone: ''
        });
      },
      // 移除联系方式
      removePhone (index) {
        this.form.phone_list.splice(index, 1);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">

</style>
