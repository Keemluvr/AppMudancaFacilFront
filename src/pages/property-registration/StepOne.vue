<template>
  <div class="body" v-if="this.$store.state.newImmobileCurrentStep === 1">
    <h1 class="title">Cadastro de imóvel</h1>
    <h2 class="subtitle" v-if="$store.state.newImmobile.category">
      {{$store.state.newImmobile.category}}
    </h2>
    <TabsMenu 
      class="tabs"
      :items="$store.state.newImmobileSteps" 
      :active="$store.state.newImmobileSteps[$store.state.newImmobileCurrentStep - 1]"
      viewIndex/>
    
    <!-- Mobiliado -->
    <div class="item furnished">
      <p>Mobiliado</p>
      <input type="radio" id="yes-furnished" name="furnished" 
        :value="true" 
        class="radio"
        v-model="property.furnished.included">
      <label for="yes-furnished" class="radio-label">Sim</label><br>
      <input type="radio" id="no-furnished" name="furnished" 
        :value="false" 
        class="radio" 
        checked
        v-model="property.furnished.included">
      <label for="no-furnished" class="radio-label">Não</label><br>  
    </div>

    <div class="rooms">
      <!-- Cômodos disponíveis -->
      <div class="item availableRoom">
        <p>Cômodos disponíveis</p>
        <div 
          class="room"
          v-for="(room, index) in availableRooms" 
          :key="index">
          <input 
            type="checkbox" 
            name="" 
            :id="`availableRoom-${room.name}`" 
            :value="room.name"
            v-model="selectedRooms">
          <label :for="`availableRoom-${room.name}`">{{ room.label }}</label>
        </div>
        <br/>
      </div>

      <!-- Quantidade de quartos -->
      <div class="item amoutRooms" v-if="selectedRooms.length > 0">
        <p>Quantidade de quartos (por quarto)</p>
        <div 
          class="item-amount-rooms"
          v-for="(room, index) in selectedRooms" 
          :key="index">
          <div class="group-btn-amount">
            <button 
              :class="{'btn-amount': true, selected: findLabelInFinalObject(room).amount === 1}" 
              @click="selectAmountRoom(room, 1)">1</button>
            <button 
              :class="{'btn-amount': true, selected: findLabelInFinalObject(room).amount === 2}" 
              @click="selectAmountRoom(room, 2)">2</button>
            <button 
              :class="{'btn-amount': true, selected: findLabelInFinalObject(room).amount === 3}" 
              v-on:click="selectAmountRoom(room, 3)">3</button>
            <button 
              :class="{'btn-amount': true, selected: findLabelInFinalObject(room).amount === 4}" 
              @click="selectAmountRoom(room, 4)">4 ou +</button>
          </div>
          <label :for="room">{{ findLabel(room).label }}</label>
        </div>
        <br/>
      </div>

      <!-- Cômodos compartilhados -->
      <div class="item sharedRooms" v-if="selectedRooms.length > 0">
        <p>Cômodos compartilhados</p>
        <div 
          class="room"
          v-for="(room, index) in selectedRooms" 
          :key="index">
          <input 
            type="checkbox" 
            name="" 
            :id="`shared-${room}`" 
            :value="property.availableRoom[findIndexRoom(room)].shared"
            v-model="property.availableRoom[findIndexRoom(room)].shared">
          <label :for="`shared-${room}`">{{ findLabel(room).label }}</label>
        </div>
        <br/>
      </div>
    </div>

    <!-- Área -->
    <div class="item area">
      <p>Tamanho (m²)</p>
      <!-- Área útil -->
      <div class="input">
        <label for="usefulArea">Área útil</label>
        <input id="usefulArea" v-model="property.size.usefulArea"  @keypress="onlyDecimal"/>
      </div>
      <span class="message-error" v-if="errors.size.usefulArea">
        Área útil é obrigatório.
      </span>

      <!-- Área total -->
      <div class="input totalArea">
        <label for="totalArea">Área total (opcional)</label>
        <input id="totalArea" v-model="property.size.totalArea"  @keypress="onlyDecimal"/>
      </div>
    </div>

    <!-- Ar-condicionado -->
     <div class="item airConditioning">
      <p>Ar-condicionado</p>
      <input type="radio" id="yes-airConditioning" name="airConditioning" 
        :value="true" 
        class="radio"
        v-model="property.airConditioning">
      <label for="yes-airConditioning" class="radio-label">Sim</label><br>
      <input type="radio" id="no-airConditioning" name="airConditioning" 
        :value="false" 
        class="radio" 
        checked
        v-model="property.airConditioning">
      <label for="no-airConditioning" class="radio-label">Não</label><br>  
    </div>

    <!-- Wi-fi e mais -->
    <div class="item wifiAndMore">
      <p>Wi-fi e mais</p>

      <div class="room">
        <input 
        type="checkbox" 
        name="" 
        id="wifi" 
        :value="!property.wifiMore.wifi"
        v-model="property.wifiMore.wifi">
        <label for="wifi">Wi-fi</label>
      </div>

      <div class="room">
        <input 
        type="checkbox" 
        name="" 
        id="landline" 
        :value="!property.wifiMore.landline"
        v-model="property.wifiMore.landline">
        <label for="landline">TV a cabo</label>
      </div>

      <div class="room">
        <input 
        type="checkbox" 
        name="" 
        id="internet" 
        :value="!property.wifiMore.internet"
        v-model="property.wifiMore.internet">
        <label for="internet">Internet</label>
      </div>
      
    </div>

    <!-- Permitido animais -->
    <div class="item petFriendly">
      <p>Permitido animais</p>
      <input type="radio" id="yes-petFriendly" name="petFriendly" 
        :value="true" 
        class="radio"
        v-model="property.petFriendly">
      <label for="yes-petFriendly" class="radio-label">Sim</label><br>
      <input type="radio" id="no-petFriendly" name="petFriendly" 
        :value="false" 
        class="radio" 
        checked
        v-model="property.petFriendly">
      <label for="no-petFriendly" class="radio-label">Não</label><br>  
    </div>

    <!-- Permitido smookingPermitted -->
    <div class="item furnished">
      <p>Permitido fumantes</p>
      <input type="radio" id="yes-smookingPermitted" name="smookingPermitted" 
        value="sim" 
        class="radio"
        v-model="property.smookingPermitted">
      <label for="yes-smookingPermitted" class="radio-label">Sim</label><br>
      <input type="radio" id="no-smookingPermitted" name="smookingPermitted" 
        value="nao" 
        class="radio" 
        checked
        v-model="property.smookingPermitted">
      <label for="no-smookingPermitted" class="radio-label">Não</label><br>  
      <input type="radio" id="only-smookingPermitted" name="smookingPermitted" 
        value="apenas ar livre" 
        class="radio" 
        checked
        v-model="property.smookingPermitted">
      <label for="only-smookingPermitted" class="radio-label">Apenas ao ar livre</label><br>  
    </div>

    <!-- Fotos -->
    <div class="item photos">
      <p>Fotos</p>
      <h1>Para fazer</h1>
    </div>

    <!-- Descrição -->
    <div class="item description">
      <p>Descrição</p>
      <textarea rows="5" v-model="property.description" maxlength="600">
      </textarea>
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
import { find, findIndex } from 'lodash'

export default {
  name: "Dashboard",
  components: {
    Loading,
    TabsMenu,
  },
  data() {
    return {
      loading: false,
      selectedRooms: [],
      amountRooms: [],
      property: {
        furnished: { 
          included: false
        },
        availableRoom: [],
        size: {
          usefulArea: null,
          totalArea: null,
        },
        airConditioning: false,
        wifiMore: {
          wifi: false,
          internet: false,
          landline: false
        },
        petFriendly: false,
        smookingPermitted: false
      },
      errors: {
        size: {
          usefulArea: false,
          property: {
            availableRoom: false
          }
        },
      },
      availableRooms: [
        { label: 'Área de serviço', name: 'area de servico' },
        { label: 'Banheiro', name: 'banheiro' },
        { label: 'Cozinha', name: 'cozinha' },
        { label: 'Lavanderia', name: 'lavanderia' },
        { label: 'Sala de estar', name: 'sala de estar' },
        { label: 'Sala de jantar', name: 'sala de jantar' },
        { label: 'Varanda', name: 'varanda' },
        { label: 'Academia', name: 'academia' },
        { label: 'Churrasqueira', name: 'churrasqueira' },
        { label: 'Garagem', name: 'garagem' },
        { label: 'Piscina', name: 'piscina' },
      ]
    };
  },
  methods: {
    selectAmountRoom (room, amount) {
      const index = findIndex(this.property.availableRoom, r => room === r.name)
      this.property.availableRoom[index].amount = amount
    },
    findIndexRoom (room) {
      return findIndex(this.property.availableRoom, r => room === r.name)
    },
    findLabel (room) {
      return find(this.availableRooms, r => room === r.name )
    },
    findLabelInFinalObject (room) {
      return find(this.property.availableRoom, r => room === r.name )
    },
    onlyDecimal($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.price.indexOf('.') != -1))  // 46 is dot
        $event.preventDefault()
      if(this.price!=null && this.price.indexOf(".")>-1 && (this.price.split('.')[1].length > 1))
        $event.preventDefault()
    },
    save () {
      this.loading = true
      this.$store.dispatch("setSecondStep", JSON.parse(JSON.stringify(this.property)))
      this.loading = false
    }
  },
  watch: {
    "selectedRooms"(rooms) {
      const allSelected = [] 
      rooms.map((room) => {        
        allSelected.push({ 
          name: room, 
          amount: this.property.availableRoom[this.findIndexRoom(room)]?.amount || 1, 
          shared: this.property.availableRoom[this.findIndexRoom(room)]?.shared || false })
      })
      this.property.availableRoom = allSelected
    },
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
.item label {
  color: black;
  cursor: pointer
}
.radio-label {
  margin-left: 10px;
}
.rooms {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.room + .room {
  margin-top: 10px;
}
.group-btn-amount > button {
  border: 1px solid #4976ef;
  border-left-width: 0px;
  color:#4976ef;
  padding: 5px 15px;
  cursor: pointer;
  background-color: white;
}
.group-btn-amount > button:focus {
  outline: none;
}
.btn-amount:first-child {
  border-left-width: 1px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.btn-amount:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.btn-amount.selected, .btn-amount:hover {
  background-color: #4976ef;
  color: white;
}
.btn-amount.selected:hover{
  opacity: .9;
}
.item-amount-rooms {
  display: flex;
  align-items: center;
}
.item-amount-rooms + .item-amount-rooms {
  margin-top: 10px;
}
.room > label, .item-amount-rooms > label {
  margin-left: 10px;
}
.availableRoom, .amoutRooms, .sharedRooms {
  min-width: 350px;
}
.input, textarea {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 60px;
  background: white;
  -webkit-appearance: none;
}
.input {
  max-width: 230px;
}
textarea {
  width: 100%;
  resize: vertical;
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
textarea {
  border: 1px solid #c6c6c6;
}
.input > input:focus, textarea:focus {
  outline: none;
  border: 1.5px solid #4976ef;
}
.totalArea {
  margin-top: 10px;
}
.list {
  display: flex;
  flex-direction: column;
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