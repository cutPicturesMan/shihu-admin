<template>
  <div class="">
    <Form-item
      label="营业时间"
      v-for="(item, index) in form.openingTimes"
      :required="true"
      :key="index">
      <Row type="flex" class="mb25">
        <span class="mr15">星期</span>
        <Form-item
          :prop="'openingTimes.' + index + '.day'"
          :rules="{required: true, type: 'array', message: '请选择相应的星期', trigger: 'blur'}">
          <Button-group>
            <template v-for="n in 7">
              <template v-if="isSelected(n, index)">
                <Button
                  type="primary"
                  v-text="openingDaysText[n-1]"
                  @click="selectOpeningDay(n, index)"></Button>
              </template>
              <template v-else>
                <Button
                  type="ghost"
                  v-text="openingDaysText[n-1]"
                  @click="selectOpeningDay(n, index)"
                  :disabled="dayDisabled(n)"></Button>
              </template>
            </template>
          </Button-group>
        </Form-item>
        <Col span="12" offset="1">
          <Button
            type="ghost"
            @click="removeOpeningTimes(index)"
            v-if="index !== 0">删除</Button>
        </Col>
      </Row>
      <Row class="mb25"
           type="flex"
           v-for="(range, rangeIndex) in item.ranges"
           :key="rangeIndex">
        <span class="mr15">区间</span>
        <OpeningRange
          class="mr15"
          :index="index"
          :range="range"
          :rangeIndex="rangeIndex"
        ></OpeningRange>
        <Button class="mr15"
                type="ghost"
                icon="minus-round"
                @click="deleteOpeningRange(index)"
                v-show="item.ranges.length > 1">删除区间
        </Button>
      </Row>
      <Row>
        <Col span="6">
        <Button class="ml40"
                type="ghost"
                icon="plus-round"
                @click="addOpeningRange(index)">新增区间
        </Button>
        </Col>
        <Col span="12" offset="1">
        <span class="text-stable">
            <Icon type="information-circled"></Icon>
            如果需要多个营业区间，请点击“新增区间”，例如：早餐06:00-08:00，午餐10:00-14:00，晚餐17:00-20:00
          </span>
        </Col>
      </Row>
    </Form-item>
    <Form-item v-show="openingDays.length < 7">
      <Row>
        <Col span="6">
          <Button
            long
            type="dashed"
            @click="addOpeningTimes()"
            icon="plus-round">新增分段营业时间</Button>
        </Col>
        <Col span="12" offset="1">
        <span class="text-stable">
            <Icon type="information-circled"></Icon>
            如果需要按星期区分营业时间，请点击“新增分段营业时间”，例如：周二休息，周一、周三周四周五13:00-20:00营业，周六周日10:00-22:00营业
          </span>
        </Col>
      </Row>
    </Form-item>
  </div>
</template>

<script type="text/ecmascript-6">
  import OpeningRange from './OpeningRange';

  export default {
    props: {
      // 表单数据
      form: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        // 营业日期的一个星期周期
        openingDaysText: ['一', '二', '三', '四', '五', '六', '七']
      };
    },
    computed: {
      // 已选择一个星期中的哪几天
      openingDays () {
        let openingTimes = this.form.openingTimes;
        let openingDays = [];

        // 将已选的日期组合起来
        openingTimes.forEach((value, index) => {
          openingDays = openingDays.concat(value.day);
        });

        return openingDays;
      }
    },
    methods: {
      // 该星期是否已经选择
      isSelected (n, index) {
        let day = this.form.openingTimes[index].day;
        // 如果有找到该星期，则表示已经选中，返回true
        return !!~day.indexOf(n);
      },
      // 该星期是否可以选择
      dayDisabled (n) {
        // 如果该星期已经被其他营业时间选中，则不可选，返回true
        return !!~this.openingDays.indexOf(n);
      },
      // 选择星期
      selectOpeningDay (n, index) {
        let day = this.form.openingTimes[index].day;
        console.log(n, index);
        // 如果已经选择了该星期，则移除它
        if (~day.indexOf(n)) {
          let i;
          // 找到该星期的序号
          day.every((value, index) => {
            if (n === value) {
              i = index;
              return false;
            } else {
              return true;
            }
          });
          day.splice(i, 1);
        } else {
          day.push(n);
        }
      },
      // 新增营业区间
      addOpeningRange (index) {
        this.form.openingTimes[index].ranges.push({
          time: []
        });
      },
      // 删除营业区间
      deleteOpeningRange (index) {
        this.form.openingTimes[index].ranges.splice(index, 1);
      },
      // 新增营业时间
      addOpeningTimes () {
        this.form.openingTimes.push({
          ranges: [{
            time: []
          }],
          day: []
        });
      },
      // 移除营业时间
      removeOpeningTimes (index) {
        if (this.form.openingTimes.length === 1) {
          return this.$Message.warning('至少填写一个营业时间段');
        }
        this.form.openingTimes.splice(index, 1);
      }
    },
    components: {
      OpeningRange
    }
  };
</script>

<style rel="stylesheet/scss" type="text/scss">

</style>
