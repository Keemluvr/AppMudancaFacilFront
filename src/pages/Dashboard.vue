<template>
  <div>
    <!--<div class="dashboard-header">
      <img class="" src="@/assets/images/ellipse-signup-top.png" />
    </div>-->
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Meus imóveis</h1>
        <p>Publicados:</p>
        <p>Locado:</p>
      </div>
      <div />
      <div class="dashboard-body">
        <Item class="item" />
      </div>
    </div>
  </div>
</template>

<script>
import Item from "../components/Item.vue";

export default {
  name: "Dashboard",
  components: {
    Item,
  },
};
</script>

<style scoped>
.dashboard-header {
  position: relative;
  padding: 2vw;
  margin: 0 5vw;
  height: 100%;
}

.circle-top {
  height: auto;
  width: auto;
  position: relative;
  top: 0;
  left: 200px;
  z-index: 2000;
}

h1 {
  color: #4976ef;
  font-weight: 400;
  font-size: 50px;
  margin: 10vh 0 3vh 0;
  z-index: 3000;
  font-family: "Poppins", sans-serif;
}

.item {
  margin: 0 5vw;
  height: 100%;
}

hr {
  border: 1px solid rgba(198, 198, 198, 0.5);
}

.dashboard-body {
  padding-top: 30px;
  background-color: rgba(235, 235, 235, 0.644);
}
</style>