import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import './styles/index.less';
import 'amfe-flexible';
import './utils/dayjs';

Vue.use(Vant);
// 加载dayjs初始化配置
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');