<template>
  <div class="">
    <Form-item
      :prop="'openingTimes.' + index + '.ranges.' + rangeIndex + '.time'"
      :rules="{required: true, type: 'array', length: 2, message: '营业时间不能为空', trigger: 'blur'}">
      <Time-picker confirm :value="range.time" format="HH:mm" type="timerange" placement="bottom-end" placeholder="选择一天的营业区间" style="width: 168px" @on-change="changeOpeningRange"></Time-picker>
    </Form-item>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      // 营业时间段序号
      index: {
        type: Number,
        required: true
      },
      // 区间
      range: {
        type: Object,
        required: true
      },
      // 区间序号
      rangeIndex: {
        type: Number,
        required: true
      }
    },
    methods: {
      // 营业区间改变
      changeOpeningRange (time) {
        this.range.time = time;
        console.log(time);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">

</style>
