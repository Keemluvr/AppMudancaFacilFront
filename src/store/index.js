import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    user: {
      id: "",
      name: "",
      email: "",
    }
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.isLogged = payload
    }
  },
  actions: {
    // getUser(context) {

    // }
  },
  modules: {
  }
})
