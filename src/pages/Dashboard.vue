<template>
  <div>
    <div class="dashboard-header">
      <img class="circle-top" src="@/assets/images/ellipse-signup-top.png" />
      <h1>Meus imóveis</h1>
    </div>
    <div class="dashboard"></div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
};
</script>

<style scoped>
.dashboard-header {
  position: absolute;
}

.circle-top {
  transform: scaleX(-1);
  height: 150px;
  width: auto;
  position: relative;
  top: -20;
  left: 250%;
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
</style>