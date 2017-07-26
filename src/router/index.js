import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';

// 商家中心
import Shop from '@/pages/Shop/Shop';
import ShopList from '@/pages/Shop/ShopList';
import ShopCategory from '@/pages/Shop/ShopCategory';
import ShopCategoryAdd from '@/pages/Shop/ShopCategoryAdd';

// 商品中心
import Product from '@/pages/Product/Product';
import ProductList from '@/pages/Product/ProductList';
import ProductCategory from '@/pages/Product/ProductCategory';

// 数据分析
import Analyze from '@/pages/Analyze/Analyze';
import AnalyzePlatform from '@/pages/Analyze/AnalyzePlatform';
import AnalyzeShop from '@/pages/Analyze/AnalyzeShop';

// 后台管理
import Admin from '@/pages/Admin/Admin';
import Menu from '@/pages/Admin/Menu/Menu';
import Auth from '@/pages/Admin/Auth/Auth';
import Manage from '@/pages/Admin/Manage/Manage';

Vue.use(Router);

export default new Router({
  base: '/shop/list/',
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
      component: ShopList
    },
    // 商家中心
    {
      path: '/shop',
      meta: {
        breadcrumb: '商家中心'
      },
      component: Shop,
      children: [
        {
          path: 'list',
          meta: {
            breadcrumb: '店铺列表'
          },
          component: ShopList
        }, {
          path: 'category',
          meta: {
            breadcrumb: '店铺分类'
          },
          component: ShopCategory
        }, {
          path: 'category_add',
          meta: {
            breadcrumb: '新增店铺分类'
          },
          component: ShopCategoryAdd
        }
      ]
    },
    // 商品中心
    {
      path: '/product',
      meta: {
        breadcrumb: '商品中心'
      },
      component: Product,
      children: [
        {
          path: 'list',
          meta: {
            breadcrumb: '商品列表'
          },
          component: ProductList
        }, {
          path: 'category',
          meta: {
            breadcrumb: '商品分类'
          },
          component: ProductCategory
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
          path: 'shop',
          meta: {
            breadcrumb: '商家分析'
          },
          component: AnalyzeShop
        }
      ]
    },
    // 后台管理页
    {
      path: '/admin',
      meta: {
        breadcrumb: '后台管理'
      },
      component: Admin,
      children: [
        {
          path: 'menu',
          meta: {
            breadcrumb: '目录树列表'
          },
          component: Menu
        }, {
          path: 'auth',
          meta: {
            breadcrumb: '权限管理'
          },
          component: Auth
        }, {
          path: 'manage',
          meta: {
            breadcrumb: '管理员管理'
          },
          component: Manage
        }
      ]
    }
  ]
});
