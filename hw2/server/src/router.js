const db = require('./mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.use(cors);

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //自定义中间件，设置跨域需要的响应头。
    next();
};

app.use(allowCrossDomain); //运用跨域的中间件
app.use(bodyParser.text()); //运用中间件，对请求体的文本进行解析


app.get('/get_films', (req, res) => {
    let page_index = req.query['film_index'];
    db.get_films(page_index).then((items) => {
        res.json(items);
    }).catch((err) => {
        res.send(err);
        return;
    })
})

app.get('/get_one_film', (req, res) => {
    let _id = req.query['_id'];
    db.get_one_film(_id).then((items) => {
        res.json(items);
    }).catch((err) => {
        res.send(err);
        return;
    })
})

app.post('/search_film', (req, res) => {
    let name = req.body.name;
    db.search_film(name).then((items) => {
        res.json(items);
    }).catch((err) => {
        res.send(err);
        return;
    })
})

// app.get('/', (req, res) => {
//     res.send('Yo!')
// })

// db.get_films(1).then((items)=>{
//     console.log(items);
// })

// app.use('/', router);
app.listen(process.env.PORT || 9000);