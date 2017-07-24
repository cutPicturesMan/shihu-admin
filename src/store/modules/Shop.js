import iView from 'iview';
import axios from 'axios';
import utils from '@/assets/js/utils.js';
import configMap from '@/assets/js/config.js';
import * as type from '../mutation-types';

export default {
  namespaced: true,
  state: {
    // 选中的店铺列表
    // 如果是修改店铺，则数组中只能有一个元素
    // 如果是批量删除，则数组中可以有多个元素
    items: [],
    // 店铺列表
    list: [],
    // 店铺总数
    total: 0,
    // 查询字符串
    query: {
      name: '',
      date_from: '',
      date_to: '',
      page: 1,
      limit: 10
    }
  },
  mutations: {
    // 设置需要修改的商家
    [type.SET_SHOP_ITEMS] (state, items = []) {
      state.items = items;
      console.log(state.items);
    },
    // 设置商家列表
    [type.SET_SHOP_LIST] (state, payload) {
      state.list = payload;
    },
    // 设置商家总数
    [type.SET_SHOP_TOTAL] (state, payload) {
      state.total = payload;
    },
    // 修改查询字符串
    [type.UPDATE_SHOP_QUERY] (state, payload) {
      Object.assign(state.query, payload);
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
      console.log(state.query);
      let url = configMap.shop + utils.toParams(state.query);
      commit('OPEN_SPIN', null, {root: true});
      await axios.get(url)
        .then(res => {
          commit('CLOSE_SPIN', null, {root: true});
          // 如果出错了
          if (res.data.error) {
            iView.Message.error(res.data.error.message);
          } else {
            // 设置商家列表
            commit(type.SET_SHOP_LIST, res.data.result.rows);
            commit(type.SET_SHOP_TOTAL, res.data.result.total);
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
    },
    removeItems ({state, commit, dispatch}) {
      // 如果长度为0
      if (state.items.length === 0) {
        iView.Message.error('请至少选择一个要删除的店铺');
      } else {
        iView.Modal.confirm({
          title: '删除店铺',
          content: `将要删除${state.items.length}个店铺，该操作不可逆，请慎重选择`,
          onOk: async () => {
            commit('OPEN_SPIN', null, {root: true});

            // 提取出每个item的_id
            let items = [];
            state.items.forEach((item) => {
              items.push({
                _id: item._id
              });
            });

            console.log(items);

            await axios.delete(configMap.shop, items)
              .then(res => {
                commit('CLOSE_SPIN', null, {root: true});
                // 如果出错了
                if (res.data.error) {
                  iView.Message.error(res.data.error.message);
                } else {
                  // 设置商家列表
                  commit(type.SET_SHOP_LIST, res.data.result.rows);
                  commit(type.SET_SHOP_TOTAL, res.data.result.total);
                }
              }, e => {
                commit('CLOSE_SPIN', null, {root: true});
                iView.Message.error('删除失败：' + e);

                return Promise.reject();
              });
          }
        });
      }
    }
  }
};
