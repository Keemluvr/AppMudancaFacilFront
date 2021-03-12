<template>
  <div>
    <Header />
    <div class="app">
      <Body class="main" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Body from "@/pages/property-registration/Index.vue";

export default {
  name: "Dashboard",
  components: {
    Header,
    Body,
  },
};
</script>