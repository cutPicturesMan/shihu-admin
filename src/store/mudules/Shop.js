import * as type from '../mutation-types';

export default {
  state: {
    StoreList: []
  },
  mutations: {
    [type.SET_STORE_ID] (state, id) {
      console.log('2222222222');
    }
  },
  actions: {
    [type.GET_STORE_LIST] (state) {
      console.log(111);
    },
    aaa (context, payload) {
      console.log('-------------');
      console.log(payload);
      return new Promise((resolve, reject) => {
        reject();
      });
    },
    bbb () {
      console.log('***');
    }
  }
};
