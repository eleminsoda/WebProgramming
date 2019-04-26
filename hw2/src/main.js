import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routers'

Vue.use(VueRouter)
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