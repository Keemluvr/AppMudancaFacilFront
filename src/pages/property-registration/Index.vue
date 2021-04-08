<template>
  <div class="body">
    <div v-if="this.$store.state.newImmobileCurrentStep === 0">
      <h1 class="title">Cadastro de imóvel</h1>
      <label class="label-btn-group" for="type-sale">Você gostaria de:</label>
      <div class="btn-group" id="type-sale" >
        <button v-bind:class="selectToSell" @click="changeBusinessType">
          Alugar
        </button>
        <button v-bind:class="selectToHire" @click="changeBusinessType">
          Vender
        </button>
      </div>
      <span class="message-error" v-if="errors.businessType">
        Tipo de negócio é obrigatório.
      </span>

      <div class="input">
        <label for="title">Título</label>
        <input id="title" v-model="property.title" placeholder="Casa de Anvenaria"/>
      </div>
      <span class="message-error" v-if="errors.title">
        Título é obrigatório.
      </span>

      <div class="select">
        <label for="category">Selecione uma categoria</label>
        <select id="category" v-model="property.category">
          <option 
            v-for="({name, value}, index) in categories" 
            :key="index" 
            :value="value">
            {{name}}
          </option>
        </select>
      </div>
      <span class="message-error" v-if="errors.category">
        Categoria é obrigatório.
      </span>

      <button class="next" @click="save">Próxima Etapa</button>
      <div class="circle-1"></div>
      <div class="circle-2"></div>
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
    <StepOne v-else-if="this.$store.state.newImmobileCurrentStep === 1"/>
    <StepTwo v-else-if="this.$store.state.newImmobileCurrentStep === 2"/>
    <StepThree v-else-if="this.$store.state.newImmobileCurrentStep === 3"/>
    <StepFour v-else-if="this.$store.state.newImmobileCurrentStep === 4"/>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay"
import "vue-loading-overlay/dist/vue-loading.css"
import { isNull, lowerCase } from "lodash"
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'

export default {
  name: "Dashboard",
  components: {
    Loading,
    StepOne,
    StepTwo,
    StepThree,
    StepFour
  },
  data() {
    return {
      loading: true,
      selectTypeProperty: null,
      categories: [
        {name: "Aluguel de Quarto", value: "aluguel de quarto"},
        {name: "Apartamento", value: "apartamento"},
        {name: "Casa", value: "casa"},
        {name: "Casa de Condomínio", value: "casa de condominio"},
        {name: "Duplex / Triplex", value: "duplex/triplex"},
      ],
      property: {
        title: null,
        category: null,
        businessType: null
      },
      errors: {
        title: false,
        category: false,
        businessType: false
      },
    };
  },
  methods: {
    validFields () {
      event.preventDefault()
      const { title, category, businessType } = this.property;

      isNull(title) 
        ? (this.errors.title = true)
        : (this.errors.title = false)
      isNull(category)
        ? (this.errors.category = true)
        : (this.errors.category = false)
      isNull(businessType)
        ? (this.errors.businessType = true)
        : (this.errors.businessType = false)

      this.loading = false
    },
    changeBusinessType (e) {
      this.selectTypeProperty = e.target.outerText
      this.property.businessType = lowerCase(e.target.outerText)
    },
    async save () {
      this.loading = true
      await this.validFields()
      if(
        !isNull(this.property.title) && 
        !isNull(this.property.category) &&
        !isNull(this.property.businessType)
      ) {
        this.$store.dispatch("setFirstStep", this.property)
        this.loading = false
      }
    }
  },
  watch: {
    "property.title"(value) {
      isNull(value) 
        ? (this.errors.title = true)
        : (this.errors.title = false)
    },
    "property.category"(value) {
      isNull(value)
        ? (this.errors.category = true)
        : (this.errors.category = false)
    },
    "property.businessType"(value) {
      isNull(value)
        ? (this.errors.businessType = true)
        : (this.errors.businessType = false)
    }
  },
  computed: {
    selectToSell: function () {
      return {
        'active': this.selectTypeProperty === 'Alugar',
        'btn-left' : true
      }
    },
    selectToHire: function () {
      return {
        'active': this.selectTypeProperty === 'Vender',
        'btn-right' : true
      }
    }
  },
  async mounted() {
    this.$store.dispatch("resetPropertyRegistration")
    this.loading = false
  },
};
</script>

<style scoped>
.body {
  margin: 50px 10vw 0px 10vw;
  z-index: 2;
}
.circle-1 {
  content: url('../../assets/images/ellipse-left.png'); 
  position: absolute;
  width: auto;
  height: auto;
  right: 0px;
  top: 80px;
  z-index: 1;
}
.circle-2 {
  content: url('../../assets/images/ellipse-footer.png'); 
  position: absolute;
  width: 150px;
  height: auto;
  left: 0px;
  bottom: -50px;
  z-index: -1;
}
.title {
  text-align: center;
  color: #4976ef;
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  margin: 60px 0;
  z-index: 10;
}
.label-btn-group {
  font-weight: 600;
}
.btn-group {
  width: 100%;
  margin-top: 10px;
}
.btn-group > button {
  width: 50%;
  height: 50px;
  color:#4976ef;
  font-weight: 700;
  background-color: white;
  border: 1px solid #C4C4C4;
  transition: background-color .4s ease;
}
.btn-group > button:focus {
  outline: none;
}
.btn-group > button.active {
  color:white;
  font-weight: 700;
  background-color: #4976ef;
  border: 1px solid #4976ef;
  transition: background-color .4s ease;
}
.btn-group > .btn-left {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.btn-group > .btn-right {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.btn-group > button:hover {
  background-color: #4976ef;
  cursor: pointer;
  color: white;
}
.input, .select {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 60px;
  margin-top: 50px;
  background: white;
  -webkit-appearance: none;
}
.input > label,
.select > label {
  z-index: 3000;
  background-color: white;
  max-width: fit-content;
  margin-left: 15px;
  padding: 0 8px 0 4px;
  font-size: 16px;

}
.input > input, 
.select > select {
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
.select > select {
  height: 50px;
}
.input > input:focus {
  outline: none;
  border: 1.5px solid #4976ef;
}
.my-dropdown-toggle {
  border-radius: 5px;

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
.message-error {
  color: red;
  font-size: 15px;
  padding-top: 10px;
}
@media (max-width: 700px) {
  .circle-1 {
    display: none;
  }
  .circle-2 {
    display: none;
  }
  .title {
    margin: 0px 0px 50px 0px;
  }
  .body {
    margin: 0px 5vw 0px 5vw;
    z-index: 2;
  }
}
</style>