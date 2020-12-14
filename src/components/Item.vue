<template>
  <router-link tag="div" class="content" :to="'/'+convertToMD5(content._id)">
    <div
      class="image"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
      }"
    ></div>
    <div class="infos">
      <h2 class="title">{{ content.title }}</h2>
      <h3 class="price">R$ {{ content.price }}</h3>
      <h4 class="description">{{ content.description }}</h4>
      <div class="location">
        <img src="@/assets/icons/location.svg" class="icon-location" />
        <p class="desc-location">
          Rua {{ content.address.street }} - {{ content.address.neighborhood }},
          {{ content.address.city }} - {{ content.address.state }}
        </p>
      </div>
      <div class="position-bottom">
        <div class="info-basics">
          <div class="bedroom">
            <img src="@/assets/icons/bedroom.svg" class="icon-bedroom" />
            <p class="desc-bedroom">{{content.availableRoom[2].amount}} {{content.availableRoom[2].name}}</p>
          </div>
          <div class="toilet">
            <img src="@/assets/icons/toilet.svg" class="icon-toilet" />
            <p class="desc-toilet">{{content.availableRoom[1].amount}} {{content.availableRoom[1].name}}</p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import md5 from "md5";
export default {
  name: "Item",
  props: {
    content: Object,
    errored: Boolean,
  },
  methods: {
    convertToMD5(id) {
      return md5(id);
    },
  },
};
</script>

<style scoped>
.content {
  width: 33%;
  max-width: 380px;
  min-width: 300px;
  min-height: 440px;
  border-radius: 20px;
  margin-bottom: 50px;
  border: 1px solid #bdbdbd;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.5s ease;
}
.content:hover {
  transform: scale(1.02);
}
.image {
  min-height: 220px;
  min-width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #bdbdbd;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.infos {
  height: max-content;
  margin: 20px;
}
.title {
  text-transform: uppercase;
  font-weight: 700;
  color: #666970;
}
.price {
  color: #303030;
  font-size: 25px;
  font-weight: 800;
  margin-top: 10px;
}
.description {
  color: #303030;
  font-weight: 800;
  margin-top: 10px;
}
.location {
  margin-top: 15px;
  display: flex;
  align-items: flex-start;
}
.icon-location {
  margin-left: -5px;
  width: 20px;
}
.position-bottom {
  margin-top: 30px;
}
.info-basics {
  display: flex;
  justify-content: space-between;
}
.bedroom {
  margin-top: 15px;
  display: flex;
  align-items: flex-start;
}
.icon-bedroom {
  width: 20px;
  margin-top: -4px;
}
.toilet {
  margin-top: 15px;
  display: flex;
  align-items: flex-start;
}
.icon-toilet {
  width: 20px;
  margin-top: -4px;
}
.desc-location,
.desc-bedroom,
.desc-toilet {
  margin-left: 5px;
}
.info-locator {
  margin-top: 20px;
}
.locator {
  font-weight: 800;
  color: #303030;
}
.locator-wrapper {
  display: flex;
  margin-top: 10px;
}
.icon-locator {
  width: 35px;
}
.desc-locator {
  margin-left: 10px;
}
.name-locator {
  font-size: 20px;
  color: #303030;
}
.tel-locator {
  text-decoration: none;
  font-size: 15px;
  color: #707070;
  transition: all 0.5s ease;
}
.tel-locator:hover {
  color: #4976ef;
}
</style>