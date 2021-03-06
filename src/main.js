// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';

import App from './App';
import router from './router';
import store from './store';
import './assets/scss/reset.scss';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  mounted () {
    // message提示框消失时间设为3秒
    this.$Message.config({
      duration: 3
    });
  }
});
