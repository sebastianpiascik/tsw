import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import HorseService from "@/services/HorseService";
import ClassService from "@/services/ClassService";
import JudgeService from '@/services/JudgeService';
import AuthService from '@/services/AuthService';

export default new Vuex.Store({
  state: () => ({
    horses: null,
    horseClasses: null,
    currentHorseClass: null,
    judges: null,
    isAuth: false,
    user: null
  }),
  getters: {
    HORSES: state => {
      return state.horses;
    },
    HORSE_CLASSES: state => {
      return state.horseClasses;
    },
    CURRENT_HORSE_CLASS: state => {
      return state.horseClasses;
    },
    JUDGES: state => {
      return state.judges;
    },
    USER: state => {
      return state.user;
    },
    IS_AUTH: state => {
      return state.isAuth;
    }
  },
  mutations: {
    SET_HORSES: (state, payload) => {
      state.horses = payload;
    },
    ADD_HORSE: (state,payload) => {
      state.horses.push(payload);
    },
    UPDATE_HORSE: (state, payload) => {
      let horseIndex = state.horses.findIndex(horse => horse.id === payload.id);
      state.horses[horseIndex] = payload;
    },
    REMOVE_HORSE: (state, payload) => {
      let horseIndex = state.horses.findIndex(horse => horse.id === payload);
      state.horses.splice(horseIndex, 1);
    },

    SET_HORSE_CLASSES: (state, payload) => {
      state.horseClasses = payload;
    },
    ADD_HORSE_CLASS: (state,payload) => {
      state.horseClasses.push(payload);
    },
    UPDATE_HORSE_CLASS: (state, payload) => {
      let horseClassIndex = state.horseClasses.findIndex(horseClass => horseClass.id === payload.id);
      state.horseClasses[horseClassIndex] = payload;
    },
    REMOVE_HORSE_CLASS: (state, payload) => {
      let horseClassIndex = state.horseClasses.findIndex(horseClass => horseClass.id === payload);
      state.horseClasses.splice(horseClassIndex, 1);
    },

    SET_JUDGES: (state, payload) => {
      state.judges = payload;
    },
    ADD_JUDGE: (state, payload) => {
      state.judges.push(payload);
    },
    UPDATE_JUDGE: (state, payload) => {
      let judgeIndex = state.judges.findIndex(judge => judge.id === payload.id);
      state.judges[judgeIndex] = payload;
    },
    REMOVE_JUDGE: (state, payload) => {
      let judgeIndex = state.judges.findIndex(judge => judge.id === payload);
      state.judges.splice(judgeIndex, 1);
    },

    LOGIN: (state, payload) => {
      state.user = payload;
      state.isAuth = true;
    },
    LOGOUT: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  actions: {
    GET_HORSES: async context => {
      const response = await HorseService.fetchHorses();
      if(response.status === 200){
        context.commit('SET_HORSES', response.data);
      }
    },
    SAVE_HORSE: async (context, payload) => {
      const response = await HorseService.addHorse(payload);
      if(response.status === 200){
        context.commit('ADD_HORSE', payload);
      }
    },
    EDIT_HORSE: async (context, payload) => {
      const response = await HorseService.updateHorse(payload);
      if(response.status === 200){
        context.commit('UPDATE_HORSE', payload);
      }
    },
    DELETE_HORSE: async (context, payload) => {
      const response = await HorseService.deleteHorse(payload);
      if(response.status === 200){
        context.commit('REMOVE_HORSE', payload);
      }
    },

    GET_HORSE_CLASSES: async context => {
      const response = await ClassService.fetchClasses();
      if(response.status === 200){
        context.commit('SET_HORSE_CLASSES', response.data);
      }
    },
    SAVE_HORSE_CLASS: async (context, payload) => {
      const response = await ClassService.addClass(payload);
      if(response.status === 200){
        context.commit('ADD_HORSE_CLASS', payload);
      }
    },
    EDIT_HORSE_CLASS: async (context, payload) => {
      const response = await ClassService.updateClass(payload);
      if(response.status === 200){
        context.commit('UPDATE_HORSE_CLASS', payload);
      }
    },
    DELETE_HORSE_CLASS: async (context, payload) => {
      const response = await ClassService.deleteClass(payload);
      if(response.status === 200){
        context.commit('REMOVE_HORSE_CLASS', payload);
      }
    },


    GET_JUDGES: async context => {
      const response = await JudgeService.fetchJudges();
      if(response.status === 200){
        context.commit('SET_JUDGES', response.data);
      }
    },
    SAVE_JUDGE: async (context, payload) => {
      const response = await JudgeService.addJudge(payload);
      if(response.status === 200){
        context.commit('ADD_JUDGE', payload);
      }
    },
    EDIT_JUDGE: async (context, payload) => {
      const response = await JudgeService.updateJudge(payload);
      if(response.status === 200){
        context.commit('UPDATE_JUDGE', payload);
      }
    },
    DELETE_JUDGE: async (context, payload) => {
      const response = await JudgeService.deleteJudge(payload);
      if(response.status === 200){
        context.commit('REMOVE_JUDGE', payload);
      }
    },

    LOGIN: async (context, payload) => {
      const response = await AuthService.login(payload);
      if(response.status === 200){
        context.commit('LOGIN', response.data);
      }
    },
    LOGOUT: async (context) => {
      const response = await AuthService.logout();
      if(response.status === 200){
        context.commit('LOGOUT');
      }
    },
  }
});
