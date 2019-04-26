import App from './App.vue'
import FilmList from './components/FilmList.vue'
import DetailPage from './components/DetailPage.vue'

const routers = [{
    path: '/',
    redirect: '/filmlist',
    component: App,
    children: [{
            path: '/filmlist',
            name: 'filmlist',
            component: FilmList
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: DetailPage
        }
    ]
}]
export default routers