import Api from '@/services/Api';

export default {
  fetchClasses () {
    return Api().get('klasy');
  },

  addClass (params) {
    return Api().post('klasy', params);
  },

  updateClass (params) {
    return Api().put('klasy/' + params.id, params);
  },

  getClass (params) {
    return Api().get('klasy/' + params.id);
  },

  deleteClass (id) {
    return Api().delete('klasy/' + id);
  }
};