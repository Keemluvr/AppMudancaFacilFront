import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueIziToast from "vue-izitoast";
import { toast } from './mixins/toast'

Vue.config.productionTip = false

Vue.use(VueIziToast);

new Vue({
  mixins: [toast],
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import 'izitoast/dist/css/iziToast.min.css'
