<template>
  <div>
    <div class="login-header">
      <img class="circle-top" src="@/assets/images/ellipse-signup-top.png" />
      <router-link to="/" class="back-page">
        <img src="@/assets/icons/arrow.svg" class="icon-arrow" />
        <p class="button-back-homepage">Voltar para a página inicial</p>
      </router-link>
    </div>
    <div class="login">
      <h1>Entrar</h1>
      <div class="login-wrapper">
        <form class="login-form" @submit="login">
          <Loading
            :is-full-page="true"
            :active="loading"
            :opacity="0.8"
            loader="dots"
            color="#3F3D56"
          />

          <div class="input">
            <label for="email">Email</label>
            <input id="email" type="email" v-model="user.email" />
          </div>
          <span class="message-error" v-if="errors.email">
            Email é obrigatório.
          </span>

          <div class="input">
            <label for="senha">Senha</label>
            <input id="senha" type="password" v-model="user.password" />
          </div>
          <span class="message-error" v-if="errors.password">
            Senha é obrigatório.
          </span>

          <button type="submit">Entrar</button>
          <div class="link-signup">
            <p>Não tem uma conta ainda?</p>
            <router-link to="/signup">
              <a class="access-signup">cadastrar-se</a>
            </router-link>
          </div>
        </form>
        <div class="login-img">
          <img src="@/assets/images/login.svg" class="icon-casa" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
// import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      loading: false,
      user: {
        email: "",
        password: "",
      },
      errors: {
        email: false,
        password: false,
      },
      notification: {
        options: {
          show: {
            success: {
              position: "topRight",
              theme: "dark",
              progressBarColor: "#4976EF",
            },
            error: {
              theme: "dark",
              progressBarColor: "#4976EF",
              position: "topRight",
            },
          },
        },
      },
    };
  },
  watch: {
    "user.email"(value) {
      isEmpty(value) || !this.validEmail(value)
        ? (this.errors.email = true)
        : (this.errors.email = false);
    },
    "user.password"(value) {
      isEmpty(value)
        ? (this.errors.password = true)
        : (this.errors.password = false);
    },
  },
  methods: {
    validFields: function () {
      event.preventDefault();
      const { email, password } = this.user;

      isEmpty(email) || !this.validEmail(email)
        ? (this.errors.email = true)
        : (this.errors.email = false);
      isEmpty(password)
        ? (this.errors.password = true)
        : (this.errors.password = false);
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    login: function () {
      event.preventDefault();
      this.validFields();
      if (!this.errors.email && !this.errors.password) {
        this.loading = true;
        // TO-DO
        // login
      }
    },
  },
  mounted() {},
};
</script>


<style scoped>
.login-header {
  position: absolute;
}

.circle-top {
  height: 150px;
  width: auto;
  position: relative;
  top: 0;
  left: -20px;
  z-index: 2000;
}

.button-back-homepage {
  position: relative;
  z-index: 3000;
  display: contents;
}

.icon-arrow {
  max-width: 20px;
  position: relative;
  z-index: 3000;
  margin-right: 10px;
  top: 5px;
  left: 0;
}

.back-page {
  text-decoration: none;
  position: relative;
  z-index: 3000;
  top: -115px;
  left: -370px;
}

.login {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.login-wrapper {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 66vh;
}

.login-form {
  height: 100%;
  width: 30%;
  padding-left: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.login-img {
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 100%;
  width: 700px;
}

h1 {
  color: #4976ef;
  font-weight: 400;
  font-size: 50px;
  margin: 10vh 0 3vh 0;
  z-index: 3000;
  font-family: "Poppins", sans-serif;
}

.input {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 60px;
  margin-top: 30px;
}

.message-error {
  color: red;
  font-size: 15px;
}

label {
  z-index: 3000;
  background-color: white;
  max-width: fit-content;
  margin-left: 15px;
  padding: 0 8px 0 4px;
}

input {
  top: 7px;
  width: 100%;
  height: 40px;
  position: absolute;
  border-radius: 4px;
  padding: 5px 0 0 10px;
  border: 1.5px solid #c6c6c6;
  transition: all 0.4s ease-in-out;
}

input:focus {
  outline: none;
  border: 1.5px solid #4976ef;
}

button {
  color: white;
  min-height: 45px;
  margin-top: 50px;
  width: 102%;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.6px;
  background-color: #4976ee;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(1);
}

button:hover {
  color: white;
  background-color: #2f2e41;
  transform: scale(1.02);
}

.access-signup {
  position: static;
  margin-left: 5px;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}

.access-signup:hover {
  color: #537eef;
  transform: scale(1.02);
}

.link-signup {
  display: flex;
  font-size: 15px;
  margin-top: 10px;
}

@media only screen and (max-width: 1190px) {
  .login-img {
    display: none;
  }

  .login-form {
    padding: 0;
    width: 66%;
  }
}
</style>
