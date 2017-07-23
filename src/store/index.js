import Vue from 'vue';
import Vuex from 'vuex';
import * as type from './mutation-types';
import Shop from './modules/Shop';
import ShopCategory from './modules/ShopCategory';
import ProductCategory from './modules/ProductCategory';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // 加载框开关
    spinToggle: false,
    // 右侧弹出框组件开关
    subViewToggle: false
  },
  mutations: {
    // 开启加载框
    [type.OPEN_SPIN] (state) {
      state.spinToggle = true;
    },
    // 关闭加载框
    [type.CLOSE_SPIN] (state) {
      state.spinToggle = false;
    },
    // 开启右侧弹出框
    [type.OPEN_SUB_VIEW] (state) {
      state.subViewToggle = true;
    },
    // 关闭右侧弹出框
    [type.CLOSE_SUB_VIEW] (state) {
      state.subViewToggle = false;
    }
  },
  modules: {
    Shop,
    ShopCategory,
    ProductCategory
  }
});
