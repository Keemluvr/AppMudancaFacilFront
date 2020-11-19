<template>
  <div>
    <div class="signup-header">
      <img class="circle-top" src="@/assets/images/ellipse-signup-top.png" />
      <router-link to="/">
        <img src="@/assets/icons/arrow.svg" class="icon-arrow" />
        <p class="button-back-homepage">Voltar para a página inicial</p>
      </router-link>
    </div>
    <div class="signup">
      <h1>Cadastro</h1>
      <div class="signup-wrapper">
        <form class="signup-form" @submit="signup">
          <div class="input">
            <label for="name">Nome completo</label>
            <input id="name" v-model="user.name" />
          </div>
          <span class="message-error" v-if="errors.name">
            Nome é obrigatório.
          </span>

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

          <div class="input">
            <label for="senha2">Reescrever a senha</label>
            <input id="senha2" type="password" v-model="user.password2" />
          </div>
          <span class="message-error" v-if="errors.password2">
            Esta senha deve ser igual ao campo anterior.
          </span>

          <button type="submit">Cadastrar</button>
        </form>
        <div class="signup-img">
          <img src="@/assets/images/signup.svg" class="icon-casa" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import { createUser } from "../services/users";

export default {
  name: "Signup",
  components: {},
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
      errors: {
        name: false,
        email: false,
        password: false,
        password2: false,
      },
    };
  },
  watch: {
    "user.name"(value) {
      isEmpty(value) ? (this.errors.name = true) : (this.errors.name = false);
    },
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
    "user.password2"(value) {
      isEmpty(value) || this.user.password !== value
        ? (this.errors.password2 = true)
        : (this.errors.password2 = false);
    },
  },
  methods: {
    validFields: function () {
      event.preventDefault();
      const { name, email, password, password2 } = this.user;

      isEmpty(name) ? (this.errors.name = true) : (this.errors.name = false);
      isEmpty(email) || !this.validEmail(email)
        ? (this.errors.email = true)
        : (this.errors.email = false);
      isEmpty(password)
        ? (this.errors.password = true)
        : (this.errors.password = false);
      isEmpty(password2) || password !== password2
        ? (this.errors.password2 = true)
        : (this.errors.password2 = false);
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    signup: function () {
      event.preventDefault();
      this.validFields();
      if (
        !this.errors.name &&
        !this.errors.email &&
        !this.errors.password &&
        !this.errors.password2
      ) {
        createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          telephone: "49999999999",
          legalEntity: "fisica",
          photo: "",
        })
          .then(() => {
            console.log("deu certo");
          })
          .catch(() => {
            console.log("deu erro");
          });
      }
    },
  },
};
</script>


<style scoped>
.signup-header {
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

a {
  text-decoration: none;
  position: relative;
  z-index: 3000;
  top: -115px;
  left: -370px;
}

.signup {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.signup-wrapper {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 66vh;
}

.signup-form {
  height: 100%;
  width: 30%;
  padding-left: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.signup-img {
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

@media only screen and (max-width: 1190px) {
  .signup-img {
    display: none;
  }

  .signup-form {
    padding: 0;
    width: 66%;
  }
}
</style>
