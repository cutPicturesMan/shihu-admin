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
    },
    // 设置商家分类列表
    [type.SET_STORE_CATEGORY_LIST] (state, payload) {
      state.list = payload;
    },
    // 删除一个商家分类
    [type.DELETE_STORE_CATEGORY] (state, payload) {
      state.list.splice(payload.index, 1);
    }
  },
  actions: {
    // 获取商家分类列表
    getListData ({commit}) {
      commit('OPEN_SPIN', null, {root: true});
      axios.get(configMap.storeCategory)
        .then((res) => {
          commit('CLOSE_SPIN', null, {root: true});
          // 设置商家分类列表
          commit(type.SET_STORE_CATEGORY_LIST, res.data);
        })
        .catch((e) => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.$Message.error('获取商家分类列表失败：' + e);
        });
    },
    // 新增/更新一条数据
    createOrUpdateItem ({commit, dispatch}, payload) {
      commit('OPEN_SPIN', null, {root: true});
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

      q
        .then((res) => {
          commit('CLOSE_SPIN', null, {root: true});
          // 成功
          if (res.data.result === 1) {
            dispatch('getListData');
            commit(type.CLOSE_SUB_VIEW, null, {root: true});
            commit(type.SET_STORE_CATEGORY_ID);

            iView.Message.success(res.data.msg);
          } else {
            iView.Message.error(res.data.msg);
          }
        })
        .catch((e) => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.Message.error('操作失败：' + e);
        });
    },
    // 删除一条数据
    deleteItem ({commit}, payload) {
      commit('OPEN_SPIN', null, {root: true});
      // 删除分类
      let url = configMap.storeCategory + '/' + payload.id;

      axios.delete(url)
        .then((res) => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.Modal.remove();
          // 如果删除成功
          if (res.data.result === 1) {
            // 删除一条数据
            commit(type.DELETE_STORE_CATEGORY, payload);
            iView.Message.success(res.data.msg);
          } else {
            iView.Message.error(res.data.msg);
          }
        })
        .catch((e) => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.Modal.remove();
          iView.Message.error('操作失败：' + e);
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
