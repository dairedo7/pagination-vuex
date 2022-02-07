import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
  },

  actions: {
    GET_POSTS_FROM_API({ commit }) {
      const params = new URLSearchParams({
        _sort: "title",
      });

      return axios(`https://jsonplaceholder.typicode.com/posts?${params}`, {
        method: 'GET'
      })
        .then((response) => {
          commit('SET_POSTS_TO_VUEX', response.data)
          console.log(response.data);
        })
    }

  },

  mutations: {
    SET_POSTS_TO_VUEX: (state, posts) => {
      state.posts = posts;
    }
  },
  getters: {
    POSTS(state) {
      return state.posts;
    }
  },

  modules: {},
});
