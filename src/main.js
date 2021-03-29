import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTheMask from 'vue-the-mask'
import VueToast from 'vue-toast-notification'
import x5GMaps from 'x5-gmaps'
import Paginate from 'vuejs-paginate'
import 'vue-toast-notification/dist/theme-sugar.css'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import { PointGeom } from 'vuelayers'
import VueCurrencyInput from "vue-currency-input";

Vue.config.productionTip = false

Vue.use(VueTheMask)
Vue.use(VueToast)
Vue.use(VueLayers)
Vue.use(PointGeom)
Vue.use(VueCurrencyInput)
Vue.use(x5GMaps, { key:'AIzaSyAZjhps_ZyxSQwtAGhQwef7e6PFw4cqYfM', libraries: ['places']})
Vue.component('paginate', Paginate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
