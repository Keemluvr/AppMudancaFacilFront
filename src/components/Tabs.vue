<template>
  <div class="menu">
    <div class="item" v-bind:class="{active: active === item}" v-for="(item, index) in items" :key="item">
        <span class="index" v-if="viewIndex">{{ index + 1}}.</span> {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    items: Array,
    viewIndex: Boolean,
    active: String
  },
};
</script>

<style scoped>
.menu {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border-bottom: 2px solid #E5E5E5;
  transition: all 0.2s ease-out;
  color: black;
}
.item.active, .item:hover {
  border-bottom: 2px solid #4976ef;
}
.index {
  margin-right: 4px;
}
@media (max-width: 1500px) {
  .menu {
    flex-direction: column;
  }
  .item:not(.active) {
    display: none;
  }
}
</style>