<template>
  <div>
    <div class="dashboard-header">
      <img class="circle-top" src="@/assets/images/ellipse-signup-top.png" />
      <h1>Meus imóveis</h1>
    </div>
    <div class="dashboard">
      <Item />
    </div>
  </div>
</template>

<script>
import Item from "../components/Item.vue";
export default {
  name: "Dashboard",
  components: { Item },
};
</script>

<style scoped>
.dashboard-header {
  position: relative;
  margin: 0 5vw;
  height: 100%;
}

.circle-top {
  transform: scaleX(-1);
  height: 150px;
  width: auto;
  position: relative;
  top: 0vw;
  left: 75%;
  z-index: 2000;
}

h1 {
  color: #4976ef;
  font-weight: 400;
  font-size: 50px;
  margin: -15vh 0 3vh 0;
  z-index: 3000;
  font-family: "Poppins", sans-serif;
}

.dashboard {
  margin: 0 5vw;
  height: 100%;
  z-index: 2000;
}
</style>