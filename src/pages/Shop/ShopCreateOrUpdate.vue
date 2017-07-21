<template>
  <div class="pt50">
    <Modal
      :width="800"
      :value="createOrUpdateModelToggle"
      @on-ok="submit"
      @on-cancel="close">
      <p slot="header">新增店铺</p>
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
        <!--门店电话-->
        <ShopPhoneList :form="form"></ShopPhoneList>
        <!--营业时间-->
        <ShopServingTime :form="form"></ShopServingTime>
        <Form-item label="今日是否营业">
          <i-switch v-model="form.is_open" size="large">
            <span slot="open">营业</span>
            <span slot="close">停业</span>
          </i-switch>
          <span class="text-stable">
            如果放假，请选择停业
          </span>
        </Form-item>
        <Form-item label="是否品牌馆店铺">
          <i-switch v-model="form.is_premium">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
          <span class="text-stable"></span>
        </Form-item>
        <Form-item label="是否支持准时达">
          <i-switch v-model="form.is_ontime">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
          <span class="text-stable"></span>
        </Form-item>
        <Form-item label="配送费">
          <Row>
            <Col span="4">
              <Input-number v-model="form.agent_fee" :min="0" placeholder="请输入配送费"></Input-number>
            </Col>
            <Col span="7">
              元
            </Col>
          </Row>
        </Form-item>
        <Form-item label="起送价">
          <Row>
            <Col span="4">
              <Input-number v-model="form.deliver_amount" :min="0" placeholder="请输入起送价"></Input-number>
            </Col>
            <Col span="7">
              元
            </Col>
          </Row>
        </Form-item>
        <Form-item label="店铺简介">
          <Row>
            <Col span="18">
            <Input type="textarea"
                   v-model="form.description"
                   @input="checkDescLength"
                   :autosize="{minRows: 5,maxRows: 10}"
                   placeholder="请输入店铺的介绍，最多200字"></Input>
            </Col>
            <Col class="text-stable" span="5" offset="1">
            还可输入 <span>{{200 - form.description.length}}</span> 字
            </Col>
          </Row>
        </Form-item>
        <Form-item label="店铺logo">
          <Upload></Upload>
          <span class="text-stable">
            <Icon type="information-circled"></Icon>
            请上传一张店铺logo图
          </span>
        </Form-item>
        <Form-item label="门店图片">
          <Upload></Upload>
          <span class="text-stable">
            <Icon type="information-circled"></Icon>
            请上传门店图片，最多上传8张
          </span>
        </Form-item>
      </Form>
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
  import ShopServingTime from '@/components/ShopServingTime';
  import ShopPhoneList from '@/components/ShopPhoneList';
  import Upload from '@/components/Public/Upload';

  export default {
    props: {
      // 显示隐藏开关
      createOrUpdateModelToggle: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // 是否正在新增或者修改中
        isLoading: false,
        // 需要提交的表单数据
        form: {
          // 店铺名称
          name: '',
          category: '',
          // 店铺地址
          address_text: '',
          // 店铺经度
          latitude: 1,
          // 店铺纬度
          longitude: 1,
          // 营业时间区间
          serving_time: [{
            // 每天分段营业时间
            ranges: [{
              time: ['00:00', '23:55']
            }],
            // 星期几
            day: [1, 2, 3, 4, 5, 6, 7]
          }],
          // 店铺联系方式
          phone_list: [{
            phone: ''
          }],
          // 店铺整体营业状态，0店铺关闭，1店铺营业中
          is_open: true,
          // 是否品牌馆店铺
          is_premium: true,
          // 是否支持准时达
          is_ontime: true,
          // 配送费
          agent_fee: 5,
          // 起送价
          deliver_amount: 20,
          // 店铺图片列表
          photo_list: [],
          // logo地址
          logo_url: '',
          // 店铺介绍
          description: ''
        },
        // 表单验证规则
        rule: {
          name: [
            {required: true, message: '门店名称不能为空', trigger: 'blur'}
          ],
          category: [
            {required: true, message: '请选择商家分类', trigger: 'blur'}
          ],
          phone_list: [
            {required: true, message: '门店电话不能为空', trigger: 'blur'}
          ],
          serving_time: [
            {required: true, type: 'array', min: 1, message: '至少选择一个营业时间', trigger: 'change'}
          ]
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
    methods: {
      // 关闭弹窗
      close () {
        this.$emit('update:createOrUpdateModelToggle', false);
      },
      // 检查简介文字
      checkDescLength () {
        let length = this.form.description.length;
        if (length > 200) {
          this.form.description = this.form.description.slice(0, 200);
        }
      },
      // 提交表单
      submit () {
        this.$refs.form.validate((valid) => {
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
      ShopPhoneList,
      // 营业时间组件
      ShopServingTime,
      // 上传组件
      Upload
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  @import '../../assets/scss/components/_upload.scss';

</style>
