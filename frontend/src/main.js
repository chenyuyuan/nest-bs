import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import axios from 'axios';


Vue.config.productionTip = false
axios.defaults.withCredentials=true;


new Vue({
  router,
  el:'#app', // ?
  render: h => h(App)
}).$mount('#app');

