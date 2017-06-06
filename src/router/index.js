import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';

// 商家中心
import Store from '@/pages/Store/Store';
import StoreList from '@/pages/Store/StoreList';
import StoreAdd from '@/pages/Store/StoreAdd';
import StoreCategory from '@/pages/Store/StoreCategory';
import StoreCategoryAdd from '@/pages/Store/StoreCategoryAdd';

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
      component: Store,
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
