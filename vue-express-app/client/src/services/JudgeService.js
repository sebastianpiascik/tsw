import Api from '@/services/Api';

export default {
  fetchJudges () {
    return Api().get('sedziowie');
  },

  addJudge (params) {
    return Api().post('sedziowie', params);
  },

  updateJudge (params) {
    return Api().put('sedziowie/' + params.id, params);
  },

  getJudge (params) {
    return Api().get('sedziowie/' + params.id);
  },

  deleteJudge (id) {
    return Api().delete('sedziowie/' + id);
  }
};