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
      v-for="(immobile, index) in JSON.parse(JSON.stringify(this.$store.state.propertiesByOwner))"
      :key="index"
      :content="immobile"
      :errored="errored"
    />
  </div>
</template>

<script>
import Item from "../components/Item.vue";
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
      loading: true,
      errored: false,
    };
  },
  async mounted() {
    this.loading = true;
    if (JSON.parse(localStorage.getItem("MF_USER"))._id) {
      await this.$store.dispatch("getPropertiesByOwner", JSON.parse(localStorage.getItem("MF_USER"))._id) 
    }
    this.loading = false;
  }
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