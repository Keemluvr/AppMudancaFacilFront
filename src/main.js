import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification';
import x5GMaps from 'x5-gmaps'
import Paginate from 'vuejs-paginate'
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false

Vue.use(VueToast);
Vue.use(x5GMaps, 'AIzaSyAZjhps_ZyxSQwtAGhQwef7e6PFw4cqYfM');
Vue.component('paginate', Paginate);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
