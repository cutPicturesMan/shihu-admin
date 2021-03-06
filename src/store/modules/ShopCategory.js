import iView from 'iview';
import axios from 'axios';
import api from '@/assets/js/api.js';
import * as type from '../mutation-types';

export default {
  namespaced: true,
  state: {
    // 需要修改的商品分类id
    id: '',
    // 商品分类列表
    list: []
  },
  getters: {},
  mutations: {
    // 设置需要修改的商家分类id
    [type.SET_SHOP_CATEGORY_ITEM] (state, id = '') {
      state.id = id;
    },
    // 设置商家分类列表
    [type.SET_SHOP_CATEGORY_LIST] (state, payload) {
      state.list = payload;
    },
    // 删除一个商家分类
    [type.DELETE_SHOP_CATEGORY] (state, payload) {
      state.list.splice(payload.index, 1);
    }
  },
  actions: {
    // 获取商家分类列表
    getListData ({commit}) {
      commit('OPEN_SPIN', null, {root: true});
      axios.get(api.shopCategory)
        .then((res) => {
          commit('CLOSE_SPIN', null, {root: true});
          // 设置商家分类列表
          commit(type.SET_SHOP_CATEGORY_LIST, res.data);
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
        url = `${api.shopCategory}/${payload._id}`;
        q = axios.put(url, {
          name: payload.name
        });
      } else {
        // 否则，表示新增
        url = api.shopCategory;
        q = axios.post(url, {
          name: payload.name
        });
      }

      q
        .then((res) => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.Modal.remove();
          // 成功
          if (res.data.result === 1) {
            dispatch('getListData');
            commit(type.SET_SHOP_CATEGORY_ITEM);

            iView.Message.success(res.data.msg);
          } else {
            iView.Message.error(res.data.msg);
          }
        })
        .catch((e) => {
          iView.Modal.remove();
          commit('CLOSE_SPIN', null, {root: true});
          iView.Message.error('操作失败：' + e);
        });
    },
    // 删除一条数据
    deleteItem ({commit}, payload) {
      commit('OPEN_SPIN', null, {root: true});
      // 删除分类
      let url = api.shopCategory + '/' + payload.id;

      axios.delete(url)
        .then((res) => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.Modal.remove();
          // 如果删除成功
          if (res.data.result === 1) {
            // 删除一条数据
            commit(type.DELETE_SHOP_CATEGORY, payload);
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
    }
  }
};
