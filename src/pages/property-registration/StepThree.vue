<template>
  <div class="body" v-if="this.$store.state.newImmobileCurrentStep === 3">
    <h1 class="title">Cadastro de imóvel</h1>
    <h2 class="subtitle" v-if="$store.state.newImmobile.category">
      {{$store.state.newImmobile.category}}
    </h2>
    <TabsMenu 
      class="tabs"
      :items="$store.state.newImmobileSteps" 
      :active="$store.state.newImmobileSteps[$store.state.newImmobileCurrentStep - 1]"
      viewIndex/>
    
    <!-- Preço -->
    <div class="item price">
      <p>Preço</p>
      <div class="option">
        <input type="radio" id="price-value" name="price" 
          value="price" 
          class="radio"
          v-model="property.price">
            <input 
              ref="inputPrice" 
              v-model="valuePrice" 
              class="input-label"
              @focus="property.price = 'price'"
              v-currency="{
                locale: 'pt',
                currency: 'BRL',
                precision: 2,
                allowNegative: false
              }">
      </div>
      <input type="radio" id="price-contact" name="price" 
        value="entrar em contato" 
        class="radio" 
        checked
        v-model="property.price">
      <label for="price-contact" class="radio-label">Por favor entrar em contato</label><br>
       <input type="radio" id="price-swap" name="price" 
        value="troca / comercio" 
        class="radio" 
        checked
        v-model="property.price">
      <label for="price-swap" class="radio-label">Troca / Comércio</label><br>
    </div>

    <!-- Renovação de contrato -->
    <div class="item contract-renewal">
      <p>Renovação de contrato</p>
      <div class="option">
        <input type="radio" id="price-value" name="contract" 
          value="mes" 
          class="radio"
          v-model="contractRenewalSelected">
        <label class="radio-label">
          a cada <input type="number" min="1" max="12" 
            v-model="monthsValue"
            @focus="property.contract.agreementType.unitTime = 'mes(es)'"> mês / meses
        </label>
      </div>
      <div class="option">
        <input type="radio" id="price-value" name="contract" 
          value="ano" 
          class="radio"
          v-model="contractRenewalSelected">
        <label class="radio-label">
          a cada <input type="number" min="3" max="60"
            v-model="yearsValue"
            @focus="property.contract.agreementType.unitTime = 'ano(s)'"> ano / anos
        </label>
      </div>
    </div>

    <!-- Quebra de contrato -->
    <div class="item contract-renewal">
      <p>Em caso de quebra de contrato</p>
      <div class="option">
        <input type="radio" id="breachContractyes" name="breachContract" 
          value="multa" 
          class="radio"
          v-model="property.contract.breachContract">
        <label class="radio-label" for="breachContractyes">
          Multa  <input 
            ref="inputPriceMulta" 
            v-model="valuePriceMulta" 
            class="input-label"
            @focus="property.contract.breachContract = 'multa'"
            v-currency="{
              locale: 'pt',
              currency: 'BRL',
              precision: 2,
              allowNegative: false,
              valueRange: {min:1, max:10000}
            }">
        </label>
      </div>
      <div class="option">
        <input type="radio" id="breachContractno" name="breachContract" 
          value="sem multa" 
          class="radio"
          v-model="property.contract.breachContract">
        <label class="radio-label" for="breachContractno">
          Sem multa
        </label>
      </div>
    </div>

    <button class="next" @click="save">Próxima Etapa</button>

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
import { getValue } from "vue-currency-input";

export default {
  name: "Dashboard",
  components: {
    Loading,
    TabsMenu,
  },
  data() {
    return {
      loading: false,
      property: {
        price: null,
        contract: {
          breachContract: null,
          breachContractprice: null,
          agreementType: {
            unitTime: null,
            time: 0,
          },
        },
      },
      valuePrice: 0,
      valuePriceMulta: 0,
      monthsValue: 0,
      yearsValue: 0,
      contractRenewalSelected: null,
      errors: {
      }
    };
  },
  methods: {
    async save () {
      if(this.property.price === 'price')
        this.property.price = getValue(this.$refs.inputPrice).toString()
      
      if(this.contractRenewalSelected === 'mes')
        this.property.contract.agreementType.time = this.monthsValue
      if(this.contractRenewalSelected === 'ano')
        this.property.contract.agreementType.time = this.yearsValue

      if(this.property.contract.breachContract === 'multa')
        this.property.contract.breachContractprice = getValue(this.$refs.inputPriceMulta)


      // validations


      this.$store.dispatch("setFourStep", {
        ...JSON.parse(JSON.stringify(this.property)),
      })
    }
  },
  watch: {
    'property.contract.agreementType.unitTime': function (value) {
      if(value === 'mes(es)') {
        this.contractRenewalSelected = 'mes'
      }
      if(value === 'ano(s)') {
        this.contractRenewalSelected = 'ano'
      }
    }
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
.item > p {
  color: black; 
  font-weight: 600;
  margin: 40px 0 15px 0;
}
.input-label {
  width: 150px;
  margin-left: 5px;
  border: 1px solid rgba(112,112,112,.4);
  padding: 3px 3px 3px 10px;
  border-radius: 5px;
  outline: none;
}
.input-label:focus {
  border-color: #4976ee;
}
.option {
  display: block;
  margin-bottom: 10px;
}
label {
  color: black;
}
</style>