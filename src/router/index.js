import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import List from '@/components/List';
// 数据分析
import Analyze from '@/components/Analyze/Analyze';
import AnalyzePlatform from '@/components/Analyze/AnalyzePlatform';
import AnalyzeMerchant from '@/components/Analyze/AnalyzeMerchant';

Vue.use(Router);

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    // 订单页
    {
      path: '/list',
      name: 'list',
      component: List
    },
    // 数据分析页
    {
      path: '/analyze',
      name: 'analyze',
      component: Analyze,
      children: [
        {
          path: 'platform',
          component: AnalyzePlatform
        }, {
          path: 'merchant',
          component: AnalyzeMerchant
        }
      ]
    }
  ]
});
