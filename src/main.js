// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);

// 使用标题可变
Vue.use(require('vue-wechat-title'));

import { Waterfall } from 'vant';
Vue.use(Waterfall);

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

//滑动导航
import vueTableSlide from 'vue-tabbar-slide'
Vue.use(vueTableSlide);



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
