import Vue from 'vue'
import router from '../router'
import { loginUser, createUser, authenticate } from "@/services/users"

export const stateUser = {
  isLogged: false,
  user: {
    _id: "",
    name: "",
    email: "",
    legalEntity: "",
    telephone: ""
  },
  userToken: "",
  loading: false,
}

export const mutationsUser = {
  UPDATE_LOGIN(state, payload) {
    state.isLogged = payload
  },
  UPDATE_USER(state, payload) {
    state.user = payload
  },
  UPDATE_TOKEN(state, payload) {
    state.userToken = payload
  }
}

export const actionsUser = {
  /** Action para a criação de um novo usuário */
  createUser(context, payload) {
    context.state.loading = true
    createUser(payload)
      // Usuário criado com sucesso
      .then(({ data }) => {
        context.state.loading = false
        // Loga o usuário com a conta que acabou de criar
        context.dispatch("getUser", {
          user: {
            email: data.user.email,
            password: payload.password,
            _id: data.user._id
          },
          popupSuccess: {
            message: 'Cadastro realizado com sucesso!',
            type: 'success',
            position: 'top-right'
          },
          popupError: {
            message: 'Erro ao realizar cadastro!',
            type: 'error',
            position: 'top-right'
          }
        })
      })
      // Erro ao criar usuário
      .catch(({ response }) => {
        context.state.loading = false

        // Mostra o popup que houve um erro no cadastro
        Vue.$toast.open({
          message: response.data.error,
          type: 'error',
          position: 'top-right'
        });
      })
  },

  /** Action para a o usuário logar na conta */
  async getUser(context, payload) {
    context.state.loading = true
    await authenticate(payload.user)
      .then(response => {
        context.commit("UPDATE_TOKEN", response.data.token)
      })
    await loginUser(payload.user)
      // Login realizado com sucesso
      .then(response => {
        context.state.loading = false
        const { _id, name, email, legalEntity, telephone } = response.data.user
        console.log(response.data.user)
        // Atualiza as variáveis de login
        const newUser = { _id, name, email, legalEntity, telephone }
        context.commit("UPDATE_USER", newUser)
        context.commit("UPDATE_LOGIN", true)
        localStorage.setItem("MF_USER", JSON.stringify(newUser));

        // Mostra o popup que o login foi um sucesso
        Vue.$toast.open(payload.popupSuccess ? payload.popupSuccess : {
          message: "Login realizado com sucesso!",
          type: "success",
          position: "top-right",
        })

        // Redireciona o usuário para a tela inicial
        router.push('/')
      })
      // Erro ao realizar login
      .catch(({ response }) => {
        context.state.loading = false

        // Mostra o popup que houve um erro ao realizar o login
        Vue.$toast.open(payload.popupError ? payload.popupError : {
          message: response.data.error,
          type: 'error',
          position: 'top-right',
        })
      })
  },

  persistUser(context) {
    const user = JSON.parse(localStorage.getItem("MF_USER"));
    if(user) {
      context.commit("UPDATE_USER", user)
      context.commit("UPDATE_LOGIN", true)
    }
  },

  /** Action para a o usuário deslogar da conta*/
  logOut(context) {
    // Atualiza as variáveis de login
    context.commit("UPDATE_USER", { id: "", name: "", email: "", legalEntity: "", telephone: "" })
    context.commit("UPDATE_LOGIN", false)
    localStorage.removeItem("MF_USER");

    // Redireciona o usuário para a tela inicial
    router.push('/')

    // Mostra o popup que o logout foi um sucesso
    Vue.$toast.open({
      message: "Conta deslogada com sucesso!",
      type: 'success',
      position: 'top-right',
    })
  },
}