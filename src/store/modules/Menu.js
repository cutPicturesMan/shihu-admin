import iView from 'iview';
import axios from 'axios';
import utils from '@/assets/js/utils.js';
import api from '@/assets/js/api.js';
import * as type from '../mutation-types';

export default {
  namespaced: true,
  state: {
    // 需要修改的栏目
    item: {},
    // 需要批量删除的栏目
    items: [],
    // 栏目列表
    list: [],
    // 栏目总数
    total: 0,
    // 查询字符串
    query: {
      page: 1,
      limit: 10
    }
  },
  mutations: {
    // 设置栏目列表
    [type.SET_MENU_LIST] (state, payload) {
      state.list = payload;
    },
    // 设置栏目总数
    [type.SET_MENU_TOTAL] (state, payload) {
      state.total = payload;
    },
    // 修改查询字符串
    [type.UPDATE_MENU_QUERY] (state, payload) {
      Object.assign(state.query, payload);
    },
    // 设置需要修改的栏目
    [type.SET_MENU_UPDATE_ITEM] (state, item = {}) {
      state.item = item;
    },
    // 设置需要批量删除的栏目
    [type.SET_MENU_DELETE_ITEMS] (state, items = []) {
      state.items = items;
    }
  },
  actions: {
    // 获取栏目列表
    async getListData ({state, commit}, payload) {
      let url = api.menu + utils.toParams(state.query);
      commit('OPEN_SPIN', null, {root: true});
      await axios.get(url)
        .then(res => {
          commit('CLOSE_SPIN', null, {root: true});
          // 如果出错了
          if (res.data.error) {
            iView.Message.error(res.data.error.message);
          } else {
            // 设置栏目列表
            commit(type.SET_MENU_LIST, res.data.result.rows);
            commit(type.SET_MENU_TOTAL, res.data.result.total);
          }
        }, e => {
          commit('CLOSE_SPIN', null, {root: true});
          iView.Message.error('获取栏目列表失败：' + e);
        });
    },
    // 新增/更新一条栏目数据
    async createOrUpdateItem ({commit, dispatch}, payload) {
      commit('OPEN_SPIN', null, {root: true});
      let url = '';
      let msg = '';
      let q = null;

      console.log(payload);

      // 如果id存在，表示是修改
      if (payload._id) {
        url = `${api.menu}/${payload._id}`;
        msg = '恭喜你，修改成功';
        q = axios.put(url, payload);
      } else {
        // 否则，表示新增
        url = api.menu;
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
    // 栏目排序，默认下移
    // direction: -1上移，direction: 1下移
    async exchangeMenu ({commit, dispatch}, payload) {
      commit('OPEN_SPIN', null, {root: true});

      await axios.put(api.menu_exchange_menu, payload)
        .then(res => {
          commit('CLOSE_SPIN', null, {root: true});
          // 如果更新排序出错
          if (res.data.error) {
            iView.Message.error(res.data.error.message);
          } else {
            iView.Message.success('修改排序成功');
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
        title: '删除栏目',
        content: `将要删除栏目为：<strong class="text-error">${payload.name}</strong>，该操作不可逆，请慎重选择`,
        onOk: () => {
          commit('OPEN_SPIN', null, {root: true});

          axios.delete(api.menu + payload._id)
            .then(res => {
              commit('CLOSE_SPIN', null, {root: true});
              commit(type.SET_MENU_DELETE_ITEMS, []);

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
    deleteBatch ({state, commit, dispatch}, payload) {
      // 如果长度为0
      if (state.items.length === 0) {
        iView.Message.error('请至少选择一个要删除的栏目');
      } else {
        let content = '';
        let menus = '';
        state.items.forEach((item) => {
          menus += `<strong class="text-error">${item.name}</strong>、`;
        });
        content = `将要删除栏目为：${menus.slice(0, -1)}，该操作不可逆，请慎重选择`;

        iView.Modal.confirm({
          title: '删除栏目',
          content: content,
          onOk: () => {
            commit('OPEN_SPIN', null, {root: true});

            // 提取出每个item的_id
            let items = [];

            state.items.forEach((item) => {
              items.push(item._id);
            });
            axios.post(api.menu_delete_batch, items)
              .then(res => {
                commit('CLOSE_SPIN', null, {root: true});
                commit(type.SET_MENU_DELETE_ITEMS, []);

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
