<template>
  <div class="body">
    <div class="header">
      <div class="row">
        <h1 class="title">Meus Imóveis</h1>
        <img class="circle-top-right" src="@/assets/images/ellipse-my-properties.png" />
      </div>
      <div class="choice-list">
        <a
          class="choice" 
          v-bind:class="{ active: showPublished }" 
          v-on:click="showPublishedItems">
            Publicados ({{JSON.parse(JSON.stringify(this.$store.state.propertiesByOwner)).length}})
          </a>
        <a 
          class="choice" 
          v-bind:class="{ active:showLeased }" 
          v-on:click="showLeasedItems">
            Locados (0)
          </a>
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
    <div v-else-if="showPublished" class="list-items">
      <Item
        v-for="(immobile, index) in JSON.parse(JSON.stringify(this.$store.state.propertiesByOwner))"
        :key="index"
        :content="immobile"
        :errored="errored"
      />
    </div>
    <div v-else-if="showLeased" class="list-items">
      Em construção
    </div>
    <Footer/>
  </div>
</template>

<script>
import Item from "../components/Item.vue";
import Footer from "../components/Footer.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Dashboard",
  components: {
    Item,
    Loading,
    Footer
  },
  data() {
    return {
      showPublished: true,
      showLeased: false,
      loading: true,
      errored: false,
    };
  },
   methods: {
    showPublishedItems: function () {
     this.showPublished = true
     this.showLeased = false
    },
    showLeasedItems: function () {
     this.showPublished = false
     this.showLeased = true
    }
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
.body {
  background-color: #f9f9f9;
}
.header {
  padding: 50px 5vw 0 50px;
  background-color: white;
  border-bottom: 2px solid #e5e5e5;
  padding-bottom: 15px;
}
.row {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 120px;
}
.circle-top-right {
  position: absolute;
  right: -5.9vw;
  top: -50px;
  height: 200px;
  z-index: 0;
}
.title {
  margin-left: 8vw;
  font-size: 50px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #4976EF;
  z-index: 10;
}
.choice-list {
  margin-left: 8vw;
}
.choice {
  text-decoration: none;
  margin-right: 50px;
  z-index: 10;
}
.choice:hover {
  color: #4976EF;
  cursor: pointer;
}
.list-items {
  margin: 50px 5vw 0 50px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 50px;
  min-height: 40vh;
}
.active {
  color: #4976EF;
}
@media (max-width: 450px) {
  .header {
    padding: 20px 0 0 0;
    background-color: white;
    border-bottom: 2px solid #e5e5e5;
    padding-bottom: 15px;
  }
  .circle-top-right {
    top: -20px;
    height: 170px;
  }
}
@media (max-width: 759px) {
  .list-items {
    justify-content: center;
    margin: 50px 0 0 0;

  }
}
</style>