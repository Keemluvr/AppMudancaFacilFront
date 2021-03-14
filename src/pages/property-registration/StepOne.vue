<template>
  <div class="body">
    <p>Step One</p>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Dashboard",
  components: {
    Loading
  },
  data() {
    return {
      loading: false
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