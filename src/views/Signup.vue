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
import Body from "@/pages/Signup.vue";

export default {
  name: "Signup",
  components: {
    Header,
    Body,
    Footer,
  },
};
</script>
