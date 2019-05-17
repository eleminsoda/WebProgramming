let axios = require('axios');
let service = require('./services/GetService')

let connect = axios.create({
    baseURL: 'http://localhost:9000'
})

console.log(service.get_films(1));


// connect.post('/search_film',{
//     name: '野狼 Hombre'
// }).then((res) => {
//     console.log(res.data);
// }).catch((err) => {
//     console.log(err);
// })

// connect.get('/get_films?film_index=1').then((res) => {
//     console.log(res.data);
// }).catch((err) => {
//     console.log(err);
// })