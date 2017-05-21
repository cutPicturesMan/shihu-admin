<template>
  <div class="test">
    <strong @click="handleClick">{{title}}</strong>
    <button @click="reverse">翻转</button>
    <div v-for="(item, index) in list" :key="item.id">
      <strong v-text="item.name"></strong>
      <span v-if="index == 0">第一个</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      title: 'test',
      list: [{
        id: 1,
        name: 'list1'
      }, {
        id: 2,
        name: 'list2'
      }, {
        id: 3,
        name: 'list3'
      }]
    };
  },
  methods: {
    handleClick () {
      console.log(this.title);
      this.$emit('click');
    },
    reverse () {
      this.list.reverse();
    }
  },
  mounted () {
    console.log('ready');
    // this.list = [];
    setTimeout(() => {
      console.log(this.list);
      this.list[1].name = 'zz4';
    }, 200);
  }
};
</script>

<style>
.test{
  background-color: red;
}
</style>
