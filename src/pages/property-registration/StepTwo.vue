<template>
  <div class="body" v-if="this.$store.state.newImmobileCurrentStep === 2">
    <h1 class="title">Cadastro de imóvel</h1>
    <h2 class="subtitle" v-if="$store.state.newImmobile.category">
      {{$store.state.newImmobile.category}}
    </h2>
    <TabsMenu 
      class="tabs"
      :items="$store.state.newImmobileSteps" 
      :active="$store.state.newImmobileSteps[$store.state.newImmobileCurrentStep - 1]"
      viewIndex/>
    
    <!-- Localização da propriedade -->
    <div class="item area">
      <p>Localização da propriedade</p>
      <!-- CEP -->
      <div class="input">
        <label for="cep">CEP</label>
        <input id="cep" v-model="property.address.cep" placeholder="00000-000" @blur="searchMoreInformations"/>
      </div>
      <span class="message-error" v-if="errors.address.cep">
        CEP é obrigatório.
      </span>

      <div class="property-local">
        <!-- Número -->
        <div class="input">
          <label for="property-number">Número</label>
          <input id="property-number" v-model="property.address.number" placeholder="456"/>
        </div>
        <span class="message-error" v-if="errors.address.number">
          Número é obrigatório.
        </span>

        <!-- Rua -->
        <div class="input">
          <label for="property-street">Rua</label>
          <input id="property-street" v-model="property.address.street" placeholder="Lucio Ludgero"/>
        </div>
        <span class="message-error" v-if="errors.address.street">
          Rua é obrigatório.
        </span>
      </div>
    </div>

    <!-- Endereço da propriedade -->
    <div class="item address">
      <p>Endereço da propriedade</p>
       <!-- Bairro -->
      <div class="input">
        <label for="property-neighborhood">Bairro</label>
        <input id="property-neighborhood" v-model="property.address.neighborhood" 
          placeholder="Santa Catarina"/>
      </div>
      <span class="message-error" v-if="errors.address.neighborhood">
        Bairro é obrigatório.
      </span>
      <div class="property-address">
        <!-- Cidade -->
        <div class="input">
          <label for="property-city">Cidade</label>
          <input id="property-city" v-model="property.address.city" placeholder="São Lageanos"/>
        </div>
        <span class="message-error" v-if="errors.address.city">
          Cidade é obrigatório.
        </span>

        <!-- Estado -->
        <div class="input">
          <label for="property-state">Estado</label>
          <input id="property-state" v-model="property.address.state" placeholder="Rio Grande do Sul"/>
        </div>
        <span class="message-error" v-if="errors.address.state">
          Estado é obrigatório.
        </span>
      </div>
    </div>

    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" @update:center="updateCoordinates" @update:zoom="updateZoom"></vl-view>

      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>

      <vl-layer-vector>
        <vl-source-vector ident="drawTarget"></vl-source-vector>
      </vl-layer-vector>

      <vl-interaction-draw source="drawTarget" :type="drawType"  @update:center="updateCoordinates"></vl-interaction-draw>
      <vl-interaction-modify source="drawTarget"></vl-interaction-modify>
      <vl-interaction-snap source="drawTarget" :priority="10"></vl-interaction-snap>
    </vl-map>


    <!-- Proximidades -->
    <div class="item proximities">
      <p>Proximidades</p>
      <span>Selecione os locais que estão a um raio de 0 a 1km do imóvel.</span>
      <div class="group-proximity">
        <div 
          class="proximity"
          v-for="(location, indexLocation) in locations" 
          :key="indexLocation">
          <p>{{ location.type }}</p>

          <div
            class="proximity-item"
            v-for="(locationByType, index) in location.group"
            :key="index">
            <input 
              type="checkbox"
              :name="`proximity-${index}`" 
              :id="`proximity-${index}`" 
              :value="locations[indexLocation].group[index].included"
              v-model="locations[indexLocation].group[index].included"
            >
            <label :for="`proximity-${index}`">{{ index }}</label>
          </div>
        </div>
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
import { isEmpty, mapValues } from 'lodash'

export default {
  name: "Dashboard",
  components: {
    Loading,
    TabsMenu
  },
  data() {
    return {
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined,
      drawCollection: [],
      drawType: "Point",
      event: {
        name: null,
        description: null,
        location: {
          title: null,
          zoom: 5,
          coordinates: null
        }
      },
      locations: [
        {
          type: 'Lazer',
          group: {
            'Praça pública': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Teatro': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Parque de diversão': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Parque aquático': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Zoológico': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Parque ecológico': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Jardim botânico': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Shopping': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Cinema': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Praia': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Loja de conveniência': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Loja de roupas': {
              longitude: 0,
              latitude: 0,
              included: false
            },
          }
        },
        {
          type: 'Alimentação',
          group: {
            'Food truck': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Mercado': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Mercearia': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Atacado': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Fast food': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Cafeteria': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Hamburgueria': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Padaria': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Bares': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Restaurante': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Charrascaria': {
              longitude: 0,
              latitude: 0,
              included: false
            },
          }
        },
        {
          type: 'Educação',
          group: {
            'Biblioteca': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Escola de ensino básico': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Escola de ensino médio': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Escola pública': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Escola privada': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Faculdade privada': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Faculdade pública': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Creche': {
              longitude: 0,
              latitude: 0,
              included: false
            },
          }
        },
        {
          type: 'Outros',
          group: {
            'Pet shop': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Ponto de ônibus': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Trem': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Metrô': {
              longitude: 0,
              latitude: 0,
              included: false
            },
            'Ponto de táxi': {
              longitude: 0,
              latitude: 0,
              included: false
            },
          }
        },
      ],
      loading: false,
      property: {
        address: {
          cep: null,
          number: null,
          street: null,
          neighborhood:  null,
          city: null,
          state: null,
        },
        proximity: []
      },
      mapOptions: {
        center: { lat: -27.47, lng: 153.025 },
        zoom: 12,
      },
      errors: {
        address: {
          cep: null,
          number: null,
          street: null,
          neighborhood:  null,
          city: null,
          state: null,
        },
      }
    };
  },
  methods: {
    async searchMoreInformations() {
      this.loading = true
      if(!isEmpty(this.property.address.cep)) {  
        await this.$store.dispatch("getAdditionalInformationProperty", this.property.address.cep)
      }
      this.loading = false
    },
    async save () {
      JSON.parse(JSON.stringify(this.locations)).map((loc) => {
        mapValues(loc.group, (locGroup, index) => {
          this.property.proximity.push({ name: index, ...locGroup})
        })
      })

      if(this.property.address.cep)
        this.property.address.cep = this.property.address.cep.replace(/[^0-9]/g,'');

      this.$store.dispatch("setThirdStep", {
        ...JSON.parse(JSON.stringify(this.property)),
      })
    },
    updateCoordinates(data) {
      console.log([Number(data[0]), Number(data[1])])
      this.event.location.coordinates = [Number(data[0]), Number(data[1])];
    },
    updateZoom(data) {
      this.event.location.zoom = data;
    }
  },
  watch: {
    locations:{
      handler() {
        // console.log(JSON.parse(JSON.stringify(locations)))
      },
      deep: true
    },
    "$store.state.additionalPropertyAddresses": function (val) {
      if(!isEmpty(val)) {
        const newAddress = JSON.parse(JSON.stringify(val))
        this.property.address = {
          cep: this.property.address.cep,
          number: this.property.address.number,
          street: newAddress.logradouro,
          neighborhood: newAddress.bairro,
          city: newAddress.localidade,
          state: newAddress.uf,
        }
      }
    },  
  },

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
  margin-bottom: 70px;
}
button.next:hover {
  color: white;
  background-color: #2f2e41;
  transform: scale(1.02);
}
@media (min-width: 1000px) {
  .property-local, .property-address {
    display: flex;
  } 
  .property-local > .input:first-child {
    width: 170px;
    margin-right: 20px;
  }
  .property-local > .input:last-child {
    width: 100%;
  }
  .property-address > .input:first-child {
    width: 80%;
    margin-right: 20px;
  }
  .property-address > .input:last-child {
    width: 30%;
    min-width: 200px;
  }
}
.map {
  margin-top: 10px;
  min-height: 400px;
  width: 100%;
}
.proximity > p {
  margin: 20px 0 10px 0;
  font-weight: 600;
}
.proximity {
  min-width: 210px;
}
.group-proximity {
  display: flex;
  justify-content: space-between;
}
.proximity-item + .proximity-item {
  margin-top: 10px;
}
@media (max-width: 1500px) {
  .group-proximity {
    flex-direction: column;
   }
}
</style>