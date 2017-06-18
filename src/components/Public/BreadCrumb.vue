<template lang="html">
  <div class="bread-crumb">
    <span class="go-back" @click="goBack">
      <Icon type="reply"></Icon>
      <span>返回</span>
    </span>
    <template v-for="(item, index) in route.matched">
      <template v-if="index != route.matched.length - 1">
        <router-link :to="item.path" v-text="item.meta.breadcrumb"></router-link>
        <span class="crumb-separator">/</span>
      </template>
      <template v-else>
        <strong v-text="item.meta.breadcrumb"></strong>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  computed: {
    route () {
      return this.$route;
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style   lang="scss" type="text/scss" rel="stylesheet/scss"  lang="scss" type="text/scss">

  .bread-crumb{
    font-size: 14px;
    a{
      color:#333;
    }
    .go-back{
      margin-right: 8px;
      cursor: pointer;
    }
    .crumb-separator{
      margin: 0 4px;
      color: #d7dde4;
    }
  }
</style>
