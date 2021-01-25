<template>
  <div class="immobile">
    <div class="left">
     <div
        class="img"
        :style="{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
        }"></div>
    </div>
    <div class="right">
      <h1 class="title"> {{ this.$store.state.immobile.title | currency }} </h1>
      <h2 class="price"> {{ this.$store.state.immobile.price | currency }} </h2>
      <p class="label">Descrição</p>
      <p class="description"> {{ this.$store.state.immobile.description }} </p>
      <p class="label">Localização</p>
      <p class="location"> 
        {{ this.$store.state.immobile.address.street }} -  
        {{ this.$store.state.immobile.address.neighborhood }},   
        {{ this.$store.state.immobile.address.city }} - 
        {{ this.$store.state.immobile.address.state }}
      </p>
      <gmaps-map class="map">
        <gmaps-marker :position="{ lat: -27, lng: 153 }" />
      </gmaps-map>

      <p class="label">Sobre o imóvel</p>
      <div class="row paragraph">
        <img src="@/assets/icons/sofa.svg" class="icon" />
        Mobiliado:
        <span class="item">{{ this.$store.state.immobile.furnished.included ? 'Sim' : 'Não'}}</span> 
      </div> 

      <div class="row double-col" v-if="this.$store.state.immobile.furnished.included">
        <div class="paragraph">
          <img src="@/assets/icons/home-appliances.svg" class="icon" />
          Eletrodomésticos:
        </div>
        <div class="paragraph-item">
          <p class="i">Lava-louças: <span class="item">{{this.$store.state.immobile.furnished.dishwasher ? 'Sim' : 'Não'}}</span></p>
          <p class="i">Congelador: <span class="item">{{this.$store.state.immobile.furnished.fridgeFreezer ? 'Sim' : 'Não'}}</span></p>
          <p class="i">Lavanderia no edíficio: <span class="item">{{this.$store.state.immobile.furnished.laundryBuilding ? 'Sim' : 'Não'}}</span></p>
          <p class="i">Lavanderia no imóvel: <span class="item">{{this.$store.state.immobile.furnished.laundryUnit ? 'Sim' : 'Não'}}</span></p>
          <p class="i">Micro-ondas: <span class="item">{{this.$store.state.immobile.furnished.microwave ? 'Sim' : 'Não'}}</span></p>
        </div>
      </div>

      <div class="row double-col">
        <div class="paragraph">
          <img src="@/assets/icons/available-room.svg" class="icon" />
          Cômodos disponíveis:
        </div>
        <div class="paragraph-item">
          <p class="i" v-for="(room, index) in this.$store.state.immobile.availableRoom" :key="index">
            <span class="item"> {{ room.amount }} {{ room.name }} {{ room.shared == "true" ? ' - Compartilhada': '' }}</span>
          </p>
        </div>
      </div>

      <div class="row double-col">
        <div class="paragraph">
          <img src="@/assets/icons/size.svg" class="icon" />
          Tamanho:
        </div>
        <div class="paragraph-item">
          <p class="i">
            <span class="item">Área útil - {{ this.$store.state.immobile.size.usefulArea }} m²</span>
          </p>
          <p class="i">
            <span class="item">Área total - {{ this.$store.state.immobile.size.totalArea }} m²</span>
          </p>
        </div>
      </div>

      <div class="row paragraph">
        <img src="@/assets/icons/air-conditioner.svg" class="icon" />
        Ar-condicionado:
        <span class="item">{{ this.$store.state.immobile.airConditioning ? 'Sim' : 'Não'}}</span> 
      </div> 

      <div class="row double-col">
        <div class="paragraph">
          <img src="@/assets/icons/wifi.svg" class="icon" />
          Wi-fi e mais:
        </div>
        <div class="paragraph-item">
          <p class="i">
            <span class="item">Internet - {{ this.$store.state.immobile.wifiMore.wifi ? 'Sim' : 'Não' }}</span>
          </p>
          <p class="i">
            <span class="item">Telefone fixo - {{ this.$store.state.immobile.wifiMore.landline ? 'Sim' : 'Não' }}</span>
          </p>
          <p class="i">
            <span class="item">Wi-fi - {{ this.$store.state.immobile.wifiMore.wifi ? 'Sim' : 'Não' }}</span>
          </p>
        </div>
      </div>

      <div class="row paragraph">
        <img src="@/assets/icons/pet.svg" class="icon" />
        Permitido animais:
        <span class="item">{{ this.$store.state.immobile.petFriendly ? 'Sim' : 'Não'}}</span> 
      </div> 

      <div class="row paragraph">
        <img src="@/assets/icons/smoking.svg" class="icon" />
        Permitido fumantes:
        <span class="item">{{ this.$store.state.immobile.smookingPermitted }}</span> 
      </div> 

      <div class="user">
        <p class="label">Proprietário</p>
        <div class="user-box">
          <img src="@/assets/icons/user.svg" class="user-icon" />
          <span class="user-name">{{ this.$store.state.immobile.user.name }}</span> 
        </div> 
      </div> 
    </div>
  </div>
</template>

<script>
import { gmapsMap, gmapsMarker } from 'x5-gmaps'

export default {
  name: "Immobile",
  components: { 
    gmapsMap, 
    gmapsMarker 
  },
  mounted() {
    this.searchImmobile(this.$route.params.id)
  },
  methods: {
    async searchImmobile(id) {
      await this.$store.dispatch("getImmobileById", id) 
    }
  },
  filters: {
    currency: function (value) {
      if (typeof value !== "number") {
        return value;
      }
      let formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  }
}
</script>

<style scoped>
.immobile {
  margin: 50px 5vw 0 50px;
  display: flex;
  justify-content: space-between;
}
.left {
  min-width: 50%;
  max-width: 50%;
}
.img {
  min-height: 600px;
  max-height: 600px;
  width: 95%;
  background-color: #bdbdbd;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 3px;
}
.right {
  min-width: 50%;
  max-width: 50%;
  padding-left: 30px;
}
.label {
  font-weight: 700;
  margin: 35px 0 10px 0;
}
.item {
  margin-left: 5px;
  color: #4976EF;
}
.row {
  margin-top: 15px;
}
.icon {
  max-width: 25px;
  max-height: 25px;
  margin-right: 5px;
}
.title {
  font-size: 1.9em;
  font-weight: 500;
  margin-bottom: 30px;
  text-transform: capitalize;
  color: #4976EF;
}
.double-col {
  display: flex;
  align-items: flex-start;
}
.paragraph {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.paragraph-item {
}
.i {
  margin-top: 5px;
  margin-left: 5px;
}
.price {
  font-size: 1.7em;
  font-weight: 700;
}
.description {
  letter-spacing: .2px;
}
.user-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.user-icon {
  width: 30px;
  height: auto;
  margin-right: 5px;
}
.map {
  margin-top: 10px;
  max-height: 200px;
  width: 100%;
}
@media (max-width: 950px) {
  .immobile {
    flex-direction: column;
  }
  .left {
    min-width: 100%;
    max-width: 100%;
  }
  .right {
    min-width: 100%;
    max-width: 100%;
    margin-top: 20px;
    padding: 0;
  }
  .img {
    width: 100%;
    height: 80%;
    min-height: 550px;
  }
}
@media (max-width: 550px) {
  .immobile {
   margin: 5vw 5vw 0 5vw;
  }
  .double-col {
    flex-direction: column;
  }
  .paragraph-item {
    margin-left: 25px
  }
  .img {
    min-height: 250px;
  }
}
</style>