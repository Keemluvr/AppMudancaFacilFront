<template>
  <header>
    <!-- desktop -->
    <nav class="nav-desktop">
      <!-- Deslogado -->
      <router-link v-if="!$store.state.isLogged" to="/login">
        <img src="@/assets/icons/entrar.svg" class="icon-entrar" />
        Entrar
      </router-link>

      <!-- Logado -->
      <router-link v-if="$store.state.isLogged" to="/meus-imoveis">
        <img src="@/assets/icons/casa.svg" class="icon-casa" />
        Meus Imóveis
      </router-link>

      <router-link v-if="$store.state.isLogged" to="/perfil">
        <img src="@/assets/icons/user.svg" class="icon-user" />
        {{ name }}
      </router-link>

      <router-link v-if="$store.state.isLogged" to="/">
        <img
          src="@/assets/icons/sair.svg"
          class="icon-casa"
          v-on:click="logOut"
        />
      </router-link>
    </nav>
    <!-- mobile -->
    <nav
      v-bind:class="{
        active: this.mobileAberto,
        navMobile: true,
      }"
    >
      <div class="hamburguer" @click="handlehamburguer()">
        <div class="linha linha-um" />
        <div class="linha linha-dois" />
        <div class="linha linha-tres" />
      </div>

      <div class="menu">
        <!-- Deslogado -->
        <router-link to="/login"> Entrar </router-link>

        <!-- Logado -->
        <router-link to="/meus-imoveis"> Meus Imóveis </router-link>
        <router-link to="/perfil"> Perfil </router-link>
        <router-link to="/"> Sair </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { upperFirst } from "lodash";

export default {
  name: "Header",
  data: function() {
    return {
      mobileAberto: false,
    };
  },
  computed: {
    name() {
      return upperFirst(this.$store.state.user.name.trim().replace(/ .*/, ""));
    },
  },
  methods: {
    handlehamburguer() {
      return (this.mobileAberto = !this.mobileAberto);
    },
    logOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style scoped>
header {
  height: 80px;
  border-bottom: 1px solid rgba(198, 198, 198, 0.5);
}

nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 5vw;
  height: 100%;
}

img {
  min-width: 18px;
  width: 18px;
  max-width: 18px;
  margin-right: 5px;
}

a {
  text-decoration: none;
  display: inline-block;
  transition: all 0.5s ease-in;
}

a:hover {
  color: #4976ef;
}

a + a {
  margin-left: 50px;
}

.icon-entrar {
  padding-bottom: -2px;
}

.hamburguer {
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.linha {
  height: 4px;
  width: 100%;
  border-radius: 2px;
  background-color: #4976ef;
}

.linha-um {
  width: 50%;
  transition: all 0.2s ease-in-out;
}

.linha-dois {
  transition: all 0.2s ease-in-out;
}

.linha-tres {
  width: 50%;
  align-self: flex-end;
  transition: all 0.2s ease-in-out;
}

.nav-mobile {
  position: relative;
}

.menu {
  position: absolute;
  left: 0;
  top: 80px;
  width: 100%;
  max-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  transition: all 0.5s ease-in-out;
  border-bottom: 1px solid rgba(198, 198, 198, 0.5);
  visibility: visible;
  opacity: 1;
  z-index: 10000;
}

.menu > a {
  transition: opacity 0.5s ease-in-out;
}

.navMobile:not(.active) > .menu {
  max-height: 0;
  padding: 0;
}

.navMobile:not(.active) > .menu > a {
  visibility: hidden;
  opacity: 0;
}

.navMobile.active > .hamburguer > .linha-um {
  transform: rotate(45deg);
  width: 131%;
  margin-top: 13px;
  margin-left: -5px;
}

.navMobile.active > .hamburguer > .linha-dois {
  display: none;
}

.navMobile.active > .hamburguer > .linha-tres {
  transform: rotate(-48deg);
  width: 131%;
  transform: translate3d(5px, -13px, 2px) rotate(-46deg);
}

@media (max-width: 1000px) {
  .nav-desktop {
    display: none;
  }

  a + a {
    margin-left: 0;
    margin-top: 20px;
  }

  .menu {
    padding: 30px 0;
    margin: 0;
  }
}

@media (min-width: 1000px) {
  .navMobile {
    display: none;
  }
}
</style>
