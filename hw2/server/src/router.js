const db = require('./mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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


// app.use('/', router);
app.listen(process.env.PORT || 9000);