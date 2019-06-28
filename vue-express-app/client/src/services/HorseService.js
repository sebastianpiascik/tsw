import Api from '@/services/Api';

export default {
  fetchHorses () {
    return Api().get('konie');
  },

  fetchHorsesByClass (params) {
    return Api().get('konie/klasa/' + params.klasaId);
  },

  addHorse (params) {
    return Api().post('konie', params);
  },

  updateHorse (params) {
    return Api().put('konie/' + params.id, params);
  },

  getHorse (params) {
    return Api().get('konie/' + params.id);
  },

  deleteHorse (id) {
    return Api().delete('konie/' + id);
  }
};