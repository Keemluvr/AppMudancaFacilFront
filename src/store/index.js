import Vue from 'vue'
import Vuex from 'vuex'

import {
  stateUser,
  mutationsUser,
  actionsUser
} from './user'
import {
  stateImmobile,
  mutationsImmobile,
  actionsImmobile
} from './immobile'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...stateUser,
    ...stateImmobile,
  },
  mutations: {
    ...mutationsUser,
    ...mutationsImmobile,
  },
  actions: {
    ...actionsUser,
    ...actionsImmobile,
  },
  modules: {
  }
})