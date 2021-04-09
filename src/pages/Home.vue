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
  <div v-else class="homepage">
    <div class="search">
      <h1 class="title">Pesquisar imóvel</h1>
      <input class="input" v-model="search" placeholder="casa de alvenaria" />
      <button class="button" v-on:click="searchProperties">
        Pesquisar Imóvel
      </button>
    </div>
    <div class="list-cards">
      <Item
        v-for="(immobile, index) in this.$store.state.properties"
        :key="index"
        :content="immobile"
        :errored="errored"
        :showLocator="immobile.user !== null ? true : false"
        v-on:click.self="() => this.$router.go('/immobile/'+immobile._id)"/>
    </div>
    <paginate
      v-model="page"
      :page-count="this.$store.state.lengthPagesProperties"
      :click-handler="changePage"
      :prev-text="'Anterior'"
      :next-text="'Próximo'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Home",
  components: {
    Item,
    Loading,
  },
  data() {
    return {
      properties: null,
      loading: true,
      errored: false,
      search: null,
      page: ~this.$store.state.currentPageProperties || 1,
    };
  },
  mounted() {
    this.$store
      .dispatch("getProperties", {
        search: null,
        filter: null,
      })
      .then(() => {
        this.loading = false;
      });
  },
  methods: {
    async searchProperties() {
      this.loading = true
      await this.$store
        .dispatch("getProperties", {
          search: this.search,
          filter: "title",
          page: this.page,
        })
        .then(() => (this.loading = false))
    },
    async changePage(value) {
      this.page = await value 
      this.searchProperties()
      this.scrollToTop()
    },
    scrollToTop() {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  },
};
</script>

<style scoped>
.search {
  margin: 50px 10vw 170px 10vw;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  color: #4976ef;
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
}

.input {
  width: 100%;
  max-width: 800px;
  height: 40px;
  border-radius: 4px;
  padding: 2px 0 2px 12px;
  border: 1.5px solid #c6c6c6;
  transition: all 0.4s ease-in-out;
  margin-top: 50px;
}

.input:focus {
  outline: none;
  border: 1.5px solid #4976ef;
}

.button {
  max-width: 500px;
  color: #4976ef;
  min-height: 45px;
  margin-top: 50px;
  width: 102%;
  border: 1px solid #4976ef;
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.6px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(1);
}

.button:hover {
  font-weight: 400;
  color: white;
  background-color: #4976ef;
  transform: scale(1.02);
}

.list-cards {
  margin: 50px 5vw 0 50px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 50px;
}

@media (max-width: 1365px) {
  .list-cards {
    margin: 50px 10vw 0 50px;
    gap: 10px;
  }
}

@media (max-width: 500px) {
  .title {
    font-size: 1.5rem;
  }
  .search {
    margin-bottom: 90px;
  }
}
</style>
