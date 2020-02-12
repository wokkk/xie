import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/element-ui/element.js";
import 'element-ui/lib/theme-chalk/index.css';
// import Mock from 'mockjs'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
