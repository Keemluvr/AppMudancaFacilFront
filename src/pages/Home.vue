<template>
  <div v-if="loading">
    <Loading
      :is-full-page="true"
      :opacity="0.8"
      loader="dots"
      color="#3F3D56"
      :active="true"
    />
  </div>
  <div v-else class="list-cards">
    <Card
      v-for="(immobile, index) in properties"
      :key="index"
      :content="immobile"
      :errored="errored"
    />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import api from "../services/api.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Home",
  components: {
    Card,
    Loading,
  },
  data() {
    return {
      properties: null,
      loading: true,
      errored: false,
    };
  },
  mounted() {
    api
      .get("/immobile")
      .then(
        (response) => (
          (this.properties = response.data.properties),
          console.log(this.properties)
        )
      )
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>


<style scoped>
.list-cards {
  margin: 50px 5vw 0 50px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 50px;
}
</style>
