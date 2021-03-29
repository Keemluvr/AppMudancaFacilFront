<template>
  <div class="body" v-if="this.$store.state.newImmobileCurrentStep === 4">
    <h1 class="title">Cadastro de imóvel</h1>
    <h2 class="subtitle" v-if="$store.state.newImmobile.category">
      {{$store.state.newImmobile.category}}
    </h2>
    <TabsMenu 
      class="tabs"
      :items="$store.state.newImmobileSteps" 
      :active="$store.state.newImmobileSteps[$store.state.newImmobileCurrentStep - 1]"
      viewIndex/>

    <div class="item area">
      <p>Contato</p>
      <!-- Número de telefone -->
      <div class="input">
        <label for="telefone">Número de telefone</label>
        <input id="telefone" v-model="$store.state.user.telephone" placeholder="(00) 0000-0000" disabled/>
      </div>

      <!-- email -->
      <div class="input">
        <label for="email">Email</label>
        <input id="email" v-model="$store.state.user.email" placeholder="(00) 0000-0000" disabled/>
      </div>
    </div>

    <button class="next" @click="save">Postar imóvel</button>

    <div v-if="loading">
      <Loading
        :is-full-page="true"
        :opacity="0.8"
        loader="dots"
        color="#3F3D56"
        :active="true"
      />
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay"
import "vue-loading-overlay/dist/vue-loading.css"
import TabsMenu from '../../components/Tabs'

export default {
  name: "Dashboard",
  components: {
    Loading,
    TabsMenu,
  },
  data() {
    return {
    };
  },
  methods: {
    save () {
      this.$store.dispatch("saveImmobile", JSON.parse(JSON.stringify(this.$store.state.newImmobile)))
    }
  },
  watch: {

  },
  async mounted() {
   
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  color: #4976ef;
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  margin: 60px 0;
  z-index: 10;
}
.subtitle {
  text-transform: capitalize;
  font-size: 25px;
  font-weight: 600;
  color: black;
  margin-bottom: 40px;
}
.item > p {
  color: black; 
  font-weight: 600;
  margin: 40px 0 15px 0;
}
.input {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 60px;
  background: white;
  -webkit-appearance: none;
}
.input > label {
  z-index: 3000;
  background-color: white;
  max-width: fit-content;
  margin-left: 15px;
  padding: 0 8px 0 4px;
  font-size: 16px;
}
.input > input {
  top: 7px;
  width: -webkit-fill-available;
  max-width: 100%;
  height: 40px;
  position: absolute;
  border-radius: 4px;
  padding: 5px 0 0 20px;
  border: 1px solid #c6c6c6;
  transition: all 0.4s ease-in-out;
}
.input > input:focus, textarea:focus {
  outline: none;
  border: 1.5px solid #4976ef;
}

button.next {
  color: white;
  min-height: 45px;
  margin-top: 50px;
  width: 100%;
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
button.next:hover {
  color: white;
  background-color: #2f2e41;
  transform: scale(1.02);
}
</style>