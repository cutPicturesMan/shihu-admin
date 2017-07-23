import iView from 'iview';
import axios from 'axios';
import utils from '@/assets/js/utils.js';
import configMap from '@/assets/js/config.js';
import * as type from '../mutation-types';

export default {
  namespaced: true,
  state: {
    // 需要修改的商品
    item: {},
    // 商品列表
    list: [],
    // 查询字符串
    searchObj: {
      name: '',
      date_from: '',
      date_to: ''
    }
  },
  mutations: {
    // 设置需要修改的商家
    [type.SET_SHOP_ITEM] (state, item = {}) {
      state.item = item;
    },
    // 设置商家列表
    [type.SET_SHOP_LIST] (state, payload) {
      state.list = payload;
    }
  },
  actions: {
    test ({commit}, payload) {
      let q = new Promise((resolve, reject) => {
        console.log(payload);
        setTimeout(() => {
          resolve('first');
        }, 2000);
      });

      return q.then((res) => {
        console.log(res);

        return Promise.reject('second');
      }).then(() => {}, (res) => {
        console.log('接收：' + res);
        return Promise.reject('catch');
      })
        .catch(() => {
          console.log('致命错误');
          return Promise.reject('catch');
        });
    },
    // 获取商家列表
    async getListData ({state, commit}, payload) {
      let url = configMap.shop + utils.toParams(state.searchObj);
      commit('OPEN_SPIN', null, {root: true});
      await axios.get(url)
        .then(res => {
          commit('CLOSE_SPIN', null, {root: true});
          // 如果出错了
          if (res.data.error) {
            iView.Message.error(res.data.error.message);
          } else {
            // 设置商家分类列表
            commit(type.SET_SHOP_LIST, res.data.result);
          }
        }, e => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.Message.error('获取商家列表失败：' + e);

          return Promise.reject();
        });
    },
    // 新增/更新一条商家数据
    async createOrUpdateItem ({commit, dispatch}, payload) {
      commit('OPEN_SPIN', null, {root: true});
      let url = '';
      let q = null;

      console.log(payload);

      // 如果id存在，表示是修改
      if (payload._id) {
        url = `${configMap.shop}/${payload._id}`;
        q = axios.put(url, payload);
      } else {
        // 否则，表示新增
        url = configMap.shop;
        q = axios.post(url, payload);
      }

      await q.then(res => {
        commit('CLOSE_SPIN', null, {root: true});
        // 如果写入出错
        if (res.data.error) {
          iView.Message.error(res.data.error.message);
          return Promise.reject();
        } else {
          iView.Message.success('恭喜你，新增成功');
          // 刷新数据
          dispatch('getListData');
        }
      }, e => {
        commit('CLOSE_SPIN', null, {root: true});
        iView.Message.error('操作失败：' + e);
        return Promise.reject();
      });
    }
  }
};
