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
  <div v-else class="list-items">
    <Item
      v-for="(immobile, index) in properties"
      :key="index"
      :content="immobile"
      :errored="errored"
    />
  </div>
</template>

<script>
import Item from "../components/Item.vue";
import api from "../services/api.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Dashboard",
  components: {
    Item,
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
.list-items {
  margin: 50px 5vw 0 50px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 50px;
}
</style>