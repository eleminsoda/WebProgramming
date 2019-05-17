import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routers'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

// new Vue({
//     el: '#app',
//     router,
//     render: h => h(App),
// })

new Vue({
    router: router,
    render: h => h(App),
}).$mount('#app')