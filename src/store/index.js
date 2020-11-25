import Vue from 'vue'
import Vuex from 'vuex'
import { loginUser } from "@/services/users";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    user: {
      name: "",
      email: "",
      legalEntity: "",
      telephone: ""
    }
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.isLogged = payload
    },
    UPDATE_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
    getUser(context, payload) {
      loginUser(payload)
        .then(response => {
          const { name, email, legalEntity, telephone } = response.data.user
          context.commit("UPDATE_USER", { name, email, legalEntity, telephone })
          context.commit("UPDATE_LOGIN", true)
          this.$toast.show(
            "Login realizado com sucesso!",
            "SUCESSO",
            {
              position: "topRight",
              theme: "dark",
              progressBarColor: "#4976EF",
            }
          );
          this.$router.push('/')
        })
        .catch(({ response }) => {
          this.$toast.show(
            response.data.error,
            "ERRO",
            {
              position: "topRight",
              theme: "dark",
              progressBarColor: "#4976EF",
            }
          );
        })
    },

    logOut(context) {
      context.commit("UPDATE_USER", { name: "", email: "", legalEntity: "", telephone: "" })
      context.commit("UPDATE_LOGIN", false)
      this.$toast.show(
        "Conta deslogada com sucesso!",
        "SUCESSO",
        {
          position: "topRight",
          theme: "dark",
          progressBarColor: "#4976EF",
        }
      );
      this.$router.push('/')
    },
  },
  modules: {
  }
})
