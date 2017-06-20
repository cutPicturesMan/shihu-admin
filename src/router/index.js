import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';

// 商家中心
import StoreCenter from '@/pages/StoreCenter/Index';
import StoreList from '@/pages/StoreCenter/Store/List';
import StoreAdd from '@/pages/StoreCenter/Store/Add';
import StoreCategory from '@/pages/StoreCenter/StoreCategory/List';
import StoreCategoryAdd from '@/pages/StoreCenter/StoreCategory/Add';

// 数据分析
import Analyze from '@/pages/Analyze/Analyze';
import AnalyzePlatform from '@/pages/Analyze/AnalyzePlatform';
import AnalyzeStore from '@/pages/Analyze/AnalyzeStore';

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
      component: StoreList
    },
    // 商家中心
    {
      path: '/store',
      meta: {
        breadcrumb: '商家中心'
      },
      component: StoreCenter,
      children: [
        {
          path: 'list',
          meta: {
            breadcrumb: '店铺列表'
          },
          component: StoreList
        }, {
          path: 'storeAdd',
          meta: {
            breadcrumb: '新增店铺'
          },
          component: StoreAdd
        }, {
          path: 'category',
          meta: {
            breadcrumb: '店铺分类'
          },
          component: StoreCategory
        }, {
          path: 'categoryAdd',
          meta: {
            breadcrumb: '新增店铺分类'
          },
          component: StoreCategoryAdd
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
          path: 'store',
          meta: {
            breadcrumb: '商家分析'
          },
          component: AnalyzeStore
        }
      ]
    }
  ]
});
