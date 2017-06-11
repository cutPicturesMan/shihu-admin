<template>
  <div class="pt50">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <Form-item label="门店名称" prop="name">
        <Row>
          <Col span="5">
          <Input v-model="form.name" placeholder="请输入门店名称"></Input>
          </Col>
          <Col span="18" offset="1">
            <span class="text-stable">
              <Icon type="information-circled"></Icon>
              最多修改3次
            </span>
          </Col>
        </Row>
      </Form-item>
      <Form-item label="商家分类" prop="category">
        <Row>
          <Col span="5">
          <Select v-model="form.category" placeholder="请选择商家分类">
            <Option :value="item.value" v-for="item in categoryList" :key="item.label" v-text="item.label"></Option>
          </Select>
          </Col>
          <Col span="18" offset="1">

          </Col>
        </Row>
      </Form-item>

      <!--门店电话-->
      <MerchantTells :form="form"></MerchantTells>
      <!--营业时间-->
      <MerchantOpeningTimes :form="form"></MerchantOpeningTimes>

      <Form-item label="店铺简介">
        <Row>
          <Col span="8">
          <Input v-model="form.intro" type="textarea" :autosize="{minRows: 5,maxRows: 8}"
                 placeholder="请输入大概的介绍，最多200字"></Input>
          </Col>
        </Row>
      </Form-item>
      <Form-item label="店铺logo">
        <Row>
          <Col span="5">
            <Upload></Upload>
          </Col>
          <Col span="15" offset="1">
            <span class="text-stable">
              <Icon type="information-circled"></Icon>
              必须上传一张
            </span>
          </Col>
        </Row>
      </Form-item>
      <Form-item label="门店图片">
        <Row>
          <Col span="5">
            <Upload></Upload>
          </Col>
          <Col span="15" offset="1">
            <span class="text-stable">
              <Icon type="information-circled"></Icon>
              最多上传8张
            </span>
          </Col>
        </Row>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="submit">提交</Button>
        <Button type="ghost" style="margin-left: 8px">取消</Button>
      </Form-item>
    </Form>
  </div>
</template>

<script type="text/ecmascript-6">
  import MerchantOpeningTimes from '@/components/MerchantOpeningTimes/OpeningTimes';
  import MerchantTells from '@/components/MerchantTells/MerchantTells';
  import Upload from '@/components/Upload';

  export default {
    name: 'list',
    data () {
      return {
        // 需要提交的表单数据
        form: {
          name: '',
          category: '',
          intro: '',
          logo: '',
          imgs: [],
          tells: [{
            tell: ''
          }],
          // 营业时间区间
          openingTimes: [{
            ranges: [{
              time: []
            }],
            day: []
          }]
        },
        // 表单验证规则
        rule: {
          name: [
            {required: true, message: '门店名称不能为空', trigger: 'blur'}
          ],
          category: [
            {required: true, message: '请选择商家分类', trigger: 'blur'}
          ],
          tells: [
            {required: true, message: '门店电话不能为空', trigger: 'blur'}
          ],
          openingTimes: [
            {required: true, type: 'array', min: 1, message: '至少选择一个营业时间', trigger: 'change'}
          ]
        },
        // 分类列表
        categoryList: [{
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
    methods: {
      // 提交表单
      submit () {
        this.$refs['form'].validate((valid) => {
          // 如果表单验证通过，则发送ajax
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      }
    },
    components: {
      // 门店电话
      MerchantTells,
      // 营业时间组件
      MerchantOpeningTimes,
      // 上传组件
      Upload
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
</style>
