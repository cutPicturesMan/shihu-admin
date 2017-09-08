import iView from 'iview';
import axios from 'axios';
import api from '@/assets/js/api.js';
import * as type from '../mutation-types';

export default {
  namespaced: true,
  state: {
    // 需要修改的商品分类
    item: {},
    // 商品分类列表
    list: []
  },
  getters: {},
  mutations: {
    // 设置需要修改的商家分类
    [type.SET_PRODUCT_CATEGORY_ITEM] (state, item = {}) {
      state.item = item;
    },
    // 设置商家分类列表
    [type.SET_PRODUCT_CATEGORY_LIST] (state, payload) {
      state.list = payload;
    }
  },
  actions: {
    // 获取商家分类列表
    async getListData ({commit}, payload) {
      commit('OPEN_SPIN', null, {root: true});

      await axios.get(api.productCategory)
        .then((res) => {
          commit('CLOSE_SPIN', null, {root: true});
          // 如果出错了
          if (res.data.error) {
            iView.Message.error(res.data.error.message);
          } else {
            // 设置商家分类列表
            commit(type.SET_PRODUCT_CATEGORY_LIST, res.data.result);
          }
          ;
        })
        .catch((e) => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.Message.error('获取商家分类列表失败：' + e);
        });
    },
    // 新增/更新一条数据
    async createOrUpdateItem ({commit, dispatch}, payload) {
      commit('OPEN_SPIN', null, {root: true});
      let url = '';
      let q = null;

      // 如果id存在，表示是修改
      if (payload._id) {
        url = `${api.productCategory}/${payload._id}`;
        q = axios.put(url, payload);
      } else {
        // 否则，表示新增
        url = api.productCategory;
        q = axios.post(url, payload);
      }

      await q.then((res) => {
        commit('CLOSE_SPIN', null, {root: true});
        // 失败
        if (res.data.error) {
          iView.Message.error(res.data.error.message);
        } else {
          // 新增/更新成功，刷新数据
          dispatch('getListData');
          iView.Message.success(res.data.error.message);
        }
      })
        .catch((e) => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.Message.error('操作失败：' + e);
        });
    }
  }
};
