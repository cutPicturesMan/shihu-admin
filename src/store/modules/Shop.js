import iView from 'iview';
import axios from 'axios';
import utils from '@/assets/js/utils.js';
import api from '@/assets/js/api.js';
import * as type from '../mutation-types';

export default {
  namespaced: true,
  state: {
    // 需要修改的商家
    item: {},
    // 需要批量删除的商家
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
    },
    // 设置需要修改的商家
    [type.SET_SHOP_UPDATE_ITEM] (state, item = {}) {
      state.item = item;
    },
    // 设置需要批量删除的商家
    [type.SET_SHOP_DELETE_ITEMS] (state, items = []) {
      state.items = items;
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
      let url = api.shop + utils.toParams(state.query);
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
      let msg = '';
      let q = null;

      // 如果id存在，表示是修改
      if (payload._id) {
        url = `${api.shop}/${payload._id}`;
        msg = '恭喜你，修改成功';
        q = axios.put(url, payload);
      } else {
        // 否则，表示新增
        url = api.shop + 1;
        msg = '恭喜你，新增成功';
        q = axios.post(url, payload);
      }

      await q.then(res => {
        commit('CLOSE_SPIN', null, {root: true});
        // 如果写入出错
        if (res.data.error) {
          iView.Message.error(res.data.error.message);
          return Promise.reject();
        } else {
          iView.Message.success(msg);
          // 刷新数据
          dispatch('getListData');
        }
      }, e => {
        commit('CLOSE_SPIN', null, {root: true});
        iView.Message.error('操作失败：' + e);
        // 返回一个reject的promise
        return Promise.reject();
      });
    },
    // 删除单个
    deleteItem ({state, commit, dispatch}, payload) {
      iView.Modal.confirm({
        title: '删除店铺',
        content: `将要删除店铺为：<strong class="text-error">${payload.name}</strong>，该操作不可逆，请慎重选择`,
        onOk: () => {
          commit('OPEN_SPIN', null, {root: true});

          axios.delete(api.shop + payload._id)
            .then(res => {
              commit('CLOSE_SPIN', null, {root: true});
              commit(type.SET_SHOP_DELETE_ITEMS, []);

              // 如果出错了
              if (res.data.error) {
                iView.Message.error(res.data.error.message);
              } else {
                iView.Message.success(`恭喜你，成功删除了${res.data.result.n}条数据`);
                // 刷新数据
                dispatch('getListData');
              }
            })
            .catch(e => {
              commit('CLOSE_SPIN', null, {root: true});
              iView.Message.error('删除失败：' + e);
            });
        }
      });
    },
    // 批量删除
    deleteItems ({state, commit, dispatch}, payload) {
      // 如果长度为0
      if (state.items.length === 0) {
        iView.Message.error('请至少选择一个要删除的店铺');
      } else {
        let content = '';
        let shops = '';
        state.items.forEach((item) => {
          shops += `<strong class="text-error">${item.name}</strong>、`;
        });
        content = `将要删除店铺为：${shops.slice(0, -1)}，该操作不可逆，请慎重选择`;

        iView.Modal.confirm({
          title: '删除店铺',
          content: content,
          onOk: () => {
            commit('OPEN_SPIN', null, {root: true});

            // 提取出每个item的_id
            let items = [];

            state.items.forEach((item) => {
              items.push(item._id);
            });

            axios.post(api.shopDeleteBatch, items)
              .then(res => {
                commit('CLOSE_SPIN', null, {root: true});
                commit(type.SET_SHOP_DELETE_ITEMS, []);

                // 如果出错了
                if (res.data.error) {
                  iView.Message.error(res.data.error.message);
                } else {
                  iView.Message.success(`恭喜你，成功删除了${res.data.result.n}条数据`);
                  // 刷新数据
                  dispatch('getListData');
                }
              })
              .catch(e => {
                commit('CLOSE_SPIN', null, {root: true});
                iView.Message.error('删除失败：' + e);
              });
          }
        });
      }
    }
  }
};
