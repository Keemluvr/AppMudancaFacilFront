<template>
  <div>
    <Header />
    <Body />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Body from "@/pages/Login.vue";

export default {
  name: "Login",
  components: {
    Header,
    Body,
    Footer,
  },
};
</script>
