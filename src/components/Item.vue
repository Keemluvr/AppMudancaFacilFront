<template>
  <div id="app">
    <section v-if="errored" class="items">
      <p>
        Pedimos desculpas, não estamos conseguindo recuperar as informações no
        momento. Por favor, tente novamente mais tarde.
      </p>
    </section>
    <section v-else>
      <div v-if="loading" class="items">Carregando...</div>
      <div
        v-else
        v-for="(immobile, index) in properties"
        :key="index"
        class="items"
      >
        <div class="image">...</div>
        <row :gutter="12">
          <column class="title" :xs="12" :lg="6">{{ immobile.title }}</column>
          <column class="price" :xs="12" :lg="6"
            >R$: {{ immobile.price }}</column
          >

          <column class="description" :xs="12" :lg="12">{{
            immobile.description
          }}</column>
          <column class="address" :xs="12" :lg="12">
            Rua {{ immobile.address.street }} -
            {{ immobile.address.neighborhood }}, {{ immobile.address.city }} -
            {{ immobile.address.state }}
          </column>
          <column class="category" :xs="12" :lg="6"
            >Tipo: {{ immobile.category }}</column
          >
          <column class="included" :xs="12" :lg="6">
            Mobiliado: {{ immobile.furnished.included }}
          </column>
          <div>
            <span>Cômodos disponíveis: </span>
            <div
              v-for="(room, index) in immobile.availableRoom"
              :key="index"
              class="availableRoom"
            >
              {{ room.name }} ({{ room.amount }}) - {{ room.shared }}
            </div>
          </div>
        </row>
      </div>
    </section>
  </div>
</template>

<script>
import api from "../services/api.js";
import { Row, Column } from "vue-grid-responsive";

export default {
  data() {
    return {
      properties: null,
      loading: true,
      errored: false,
    };
  },
  components: {
    row: Row,
    column: Column,
  },
  mounted() {
    api
      .get("/immobile/owner/5e8e57f08c4cc11fa011bf31")
      .then((response) => (this.properties = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style scoped>
.items {
  border-radius: 5px;
  border: 1px solid rgba(198, 198, 198, 0.5);
  padding: 1vw;
  display: flex;
  width: 86vw;
  height: 40vh;
  margin-top: 1vw;
  margin-bottom: 1vw;
}

.title {
  color: #4976ee;
  width: 100%;
  font-size: 20px;
}
.price {
  width: 100%;
  font-size: 20px;
  text-align: right;
}
.included {
  color: #4976ee;
}
.category {
  color: #4976ee;
}
.availableRoom {
  color: #4976ee;
}
.image {
  width: 30vw;
  height: 30vh;
}
column {
  text-align: justify;
}
</style>