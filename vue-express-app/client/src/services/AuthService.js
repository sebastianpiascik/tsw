import Api from '@/services/Api';

export default {
  login (params) {
    return Api().post('login', params);
  },

  logout () {
    return Api().get('logout');
  },

  user () {
    return Api().get('user');
  },
};