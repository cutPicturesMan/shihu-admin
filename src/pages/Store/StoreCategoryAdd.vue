<template>
  <div class="pt50">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <Form-item label="门店名称" prop="name">
        <Row>
          <Col span="5">
          <Input v-model="form.name" placeholder="请输入"></Input>
          </Col>
          <Col span="18" offset="1">
          <span class="text-stable">
            <Icon type="information-circled"></Icon>
            最多修改3次
          </span>
          </Col>
        </Row>
      </Form-item>
      <Form-item label="经营范围" prop="category">
        <Row>
          <Col span="5">
          <Input v-model="form.name" placeholder="请输入"></Input>
          </Col>
          <Col span="18" offset="1">
          <span class="text-stable">
            <Icon type="information-circled"></Icon>
            最多修改3次
          </span>
          </Col>
        </Row>
      </Form-item>
    </Form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'list',
    data () {
      return {
        form: {
          name: '',
          category: ''
        }
      };
    },
    components: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
</style>
