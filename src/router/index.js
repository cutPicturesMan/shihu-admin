import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import List from '@/components/List';

// 商家中心
import Merchant from '@/pages/Merchant/Merchant';
import MerchantList from '@/pages/Merchant/MerchantList';
import MerchantAdd from '@/pages/Merchant/MerchantAdd';
import MerchantCategory from '@/pages/Merchant/MerchantCategory';

// 数据分析
import Analyze from '@/pages/Analyze/Analyze';
import AnalyzePlatform from '@/pages/Analyze/AnalyzePlatform';
import AnalyzeMerchant from '@/pages/Analyze/AnalyzeMerchant';

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
    // 商家中心
    {
      path: '/merchant',
      meta: {
        breadcrumb: '商家中心'
      },
      component: Merchant,
      children: [
        {
          path: 'list',
          meta: {
            breadcrumb: '商家列表'
          },
          component: MerchantList
        }, {
          path: 'add',
          meta: {
            breadcrumb: '新增商家'
          },
          component: MerchantAdd
        }, {
          path: 'category',
          meta: {
            breadcrumb: '商家分类'
          },
          component: MerchantCategory
        }
      ]
    },
    // 数据分析页
    {
      path: '/analyze',
      meta: {
        breadcrumb: '数据分析'
      },
      component: Analyze,
      children: [
        {
          path: 'platform',
          meta: {
            breadcrumb: '平台分析'
          },
          component: AnalyzePlatform
        }, {
          path: 'merchant',
          meta: {
            breadcrumb: '商家分析'
          },
          component: AnalyzeMerchant
        }
      ]
    }
  ]
});
