<template>
  <div>
    <Header />
    <div class="app">
      <Body class="main" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Body from "@/pages/Immobile.vue";

export default {
  name: "Home",
  components: {
    Header,
    Body,
    Footer,
  },
  // head: {
  //   title: {
  //     inner: "Página inicial",
  //   },
  // },
};
</script>
