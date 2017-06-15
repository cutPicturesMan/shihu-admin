// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import App from './App';
import router from './router';
// import {
//   SET_STORE_CATEGORY_ID,
//   SET_STORE_CATEGORY_List
// } from './assets/js/mutation_types.js';
import SET_STORE_CATEGORY_ID from './assets/js/mutation-types.js';
import './assets/scss/reset.scss';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    storeCategoryList: [],
    storeCategoryId: 0,
    count: 0,
    id: 1
  },
  mutations: {
    [SET_STORE_CATEGORY_ID] (state, number) {
      console.log(number);
      state.storeCategoryId = number;
    }
    // [SET_STORE_CATEGORY_LIST] (state) {
    // }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
