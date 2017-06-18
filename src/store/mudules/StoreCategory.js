import iView from 'iview';
import axios from 'axios';
import configMap from '@/assets/js/config.js';
import * as type from '../mutation-types';

export default {
  namespaced: true,
  state: {
    // 需要修改的商品分类id
    id: '',
    count: 2,
    // 商品分类列表
    list: []
  },
  getters: {},
  mutations: {
    // 设置需要修改的商家分类id
    [type.SET_STORE_CATEGORY_ID] (state, id = '') {
      state.id = id;
      console.log(id);
    },
    // 设置商家分类列表
    [type.SET_STORE_CATEGORY_LIST] (state, payload) {
      state.list = payload;
      console.log(state.list);
    }
  },
  actions: {
    // 获取商家分类列表
    getListData ({commit}) {
      iView.LoadingBar.start();
      commit('OPEN_SPIN', null, {root: true});
      axios.get(configMap.storeCategory)
        .then((res) => {
          iView.LoadingBar.finish();
          // 设置商家分类列表
          iView.Message.error('获取商家分类列表失败：');
          console.log(type.SET_STORE_CATEGORY_LIST);
          commit(type.SET_STORE_CATEGORY_LIST, res.data);
        })
        .catch((e) => {
          iView.$Loading.error();
          iView.$Message.error('获取商家分类列表失败：' + e);
        });
    },
    // 新增/更新一条数据
    createOrUpdateItem ({commit}, payload) {
      console.log('aaa');
      iView.$Loading.start();
      let url = '';
      let q = null;

      // 如果id存在，表示是修改
      if (payload._id) {
        url = `${configMap.storeCategory}/${payload._id}`;
        q = axios.put(url, {
          name: payload.name
        });
      } else {
        // 否则，表示新增
        url = configMap.storeCategory;
        q = axios.post(url, {
          name: payload.name
        });
      }

      q.then((res) => {
        iView.$Loading.finish();
        // 成功
        if (res.data.result === 1) {
          iView.$Message.success(res.data.msg);
        } else {
          iView.$Message.error(res.data.msg);
        }
      })
        .catch((e) => {
          iView.$Loading.error();
          iView.$Message.error('操作失败：' + e);
        });
    },
    aaa ({commit}, payload) {
      console.log('---');
      console.log(payload);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit(type.SET_STORE_CATEGORY_ID, payload);
          resolve();
        }, 2000);
      });
    },
    async bbb ({commit}, payload) {
      commit(type.SET_STORE_CATEGORY_ID, payload);

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('bbb');
          resolve();
        }, 2000);
      });
    }
  }
};
