<template>
  <div id="app">
    <link rel="stylesheet" href="iziToast.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/css/ol.css" type="text/css">
    <main>
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("persistUser")
      let openLayers = document.createElement('script')
      openLayers.setAttribute('src', 'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/build/ol.js')
      document.head.appendChild(openLayers)
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
html {
  overflow-x: hidden;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #4a4a55;
  vertical-align: baseline;
  font-family: "Poppins", sans-serif;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 75vh;
}

.main {
  flex: 1;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-toast {
  z-index: 100000 !important;
}

.v-toast__text {
  color: white !important;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 50px 6vw 0 50px;
}

.pagination > li {
  display: flex;
  min-width: 20px;
  width: auto;
  text-align: center;
  border: 1px solid #DDDDDD;
}

.pagination > li:hover > a {
  color: #4976EF;
}

.pagination > .page-item.active:hover > a {
  color: white !important;
}

.pagination > li > a {
  display: block;
  width: 100%;  
  height: 100%;
  padding: 7px 15px;;
}

.page-item.active {
  background-color: #4976EF;
}

.page-item.active > a {
  color: white;
}

.pagination > li:focus,
.pagination > li > a:focus {
  outline-width: 0;
}

br + input[type="radio"] {
  margin-top: 10px;
}

br + input[type="radio"] ~ label {
  margin-top: 10px;
}

input[type=checkbox],
input[type=radio] {
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 21px;
  outline: none;
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 0;
  cursor: pointer;
  border: 1px solid #BBC1E1;
  background: #fff;
  transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
}

input[type=checkbox]:after,
input[type=radio]:after {
  content: "";
  display: block;
  left: 0;
  top: 0;
  position: absolute;
  background: transparent;
  transition: transform 0.3s ease, opacity 0.2s;
}

input[type=checkbox]:checked,
input[type=radio]:checked {
  border: 1px solid #4976EF;
  background: #4976EF;
  transition: transform .6s cubic-bezier(.2, .85, .32, 1.2), opacity .3s;
}

input[type=checkbox]:disabled,
input[type=radio]:disabled {
  border: 1px solid  #F6F8FF;
  cursor: not-allowed;
  opacity: 0.9;
}

input[type=checkbox]:disabled:checked,
input[type=radio]:disabled:checked {
  border: 1px solid #BBC1E1;
}

input[type=checkbox]:disabled + label,
input[type=radio]:disabled + label {
  cursor: not-allowed;
}

input[type=checkbox]:hover:not(:checked):not(:disabled),
input[type=radio]:hover:not(:checked):not(:disabled) {
  border: 1px solid #4976EF;
}

input[type=checkbox]:focus,
input[type=radio]:focus {
  box-shadow: 0 0 0 2px rgba(39, 94, 254, .3);
}

input[type=checkbox]:not(.switch),
input[type=radio]:not(.switch) {
  width: 21px;
}

input[type=checkbox]:not(.switch):after,
input[type=radio]:not(.switch):after {
  opacity: 1;
}

input[type=checkbox]:not(.switch):checked,
input[type=radio]:not(.switch):checked {
  opacity: 1;
}

input[type=checkbox] + label,
input[type=radio] + label {
  font-size: 14px;
  line-height: 21px;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  margin-left: 4px;
}

input[type=checkbox]:not(.switch) {
  border-radius: 7px;
}

input[type=checkbox]:not(.switch):after {
  width: 4px;
  height: 7px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  left: 7px;
  top: 4px;
  transform: rotate(45deg);
}

input[type=checkbox]:not(.switch):after:checked {
  transform: rotate(43deg);
}

input[type=checkbox].switch {
  width: 38px;
  border-radius: 11px;
}

input[type=checkbox].switch:after {
  left: 2px;
  top: 2px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: #BBC1E1;
  transform: translateX(0);
}

input[type=checkbox].switch:checked {
  background: #fff;;
  transform: translateX(17px);
}

input[type=checkbox].switch:disabled:not(:checked):after {
  opacity: 0.6;
}

input[type=radio] {
  border-radius: 50%;
}

input[type=radio]:after {
  opacity: 0;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: white;
  transform: scale(.7) ;
}

input[type=radio]:checked:after {
  transform: scale(.4);
  opacity: 1;
}

input:-internal-autofill-selected {
  background-color: white !important;
}

</style>
