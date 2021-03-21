<template>
  <div class="body">
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
    TabsMenu
  },
  data() {
    return {
      loading: false,
      test: null,
      selectedRooms: [],
      amountRooms: [],
      property: {
        furnished: { 
          included: false
        },
        availableRoom: [],
        buildingAmenities: {}
      },
      errors: {
       
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
</style>