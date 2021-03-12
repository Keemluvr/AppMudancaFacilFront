<template>
  <div class="body">

    <Footer/>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Dashboard",
  components: {
    Loading,
    Footer
  },
  data() {
    return {
     
    };
  },
   methods: {
    
  },
  async mounted() {
   
  }
};
</script>

<style scoped>

</style>