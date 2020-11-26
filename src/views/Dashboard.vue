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

export default {
  name: "Dashboard",
  components: {
    Header,
  },
};
</script>