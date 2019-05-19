// 'use strict'
var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = '47.103.96.205';
var port = '27017';
var user_name = 'root';
var pwd = '58479958yH';

var database = null;


var get_films = function(page_index) {
    var start_index = (page_index - 1) * 10;
    return MongoClient.connect('mongodb://' + user_name + ':' + pwd + '@' + url + ':' + port + '/' + 'films', { useNewUrlParser: true }).then(function(db) {
        database = db;
        var cursor = database.db('films').collection('films').find().skip(start_index).limit(10);
        // var cursor = database.db('films').collection('films').find();
        return cursor.toArray();
    }).then(function(items) {
        console.log('Already got items...');
        database.close();
        result = items;
        return items;
    });
};

var get_one_film = function(_id) {
    return MongoClient.connect('mongodb://' + user_name + ':' + pwd + '@' + url + ':' + port + '/' + 'films', { useNewUrlParser: true }).then(function(db) {
        database = db;
        var cursor = database.db('films').collection('films').find({
            "_id": _id
        });
        return cursor.toArray();
    }).then(function(items) {
        console.log('Already got items...');
        database.close();
        return items;
    })
};

var search_film = function(name) {
    return MongoClient.connect('mongodb://' + user_name + ':' + pwd + '@' + url + ':' + port + '/' + 'films', { useNewUrlParser: true }).then(function(db) {
        database = db;
        var cursor = database.db('films').collection('films').find({
            "title": name
        }, {
            _id: 1
        });
        return cursor.toArray();
    }).then(function(items) {
        console.log('Already got items...');
        database.close();

        if (items.length == 0) {
            return null;
        } else {
            return items[0]._id;
        }
    })
};
// var a = get_films(2);
// console.log(a);

// get_one_film("1296824").then((items)=>{
//     console.log(items);
// })

// search_film("落叶 Dead Leave").then((_id) => {
//     console.log(_id);
//     console.log((_id) == null);
// })

module.exports = {
    get_films: get_films,
    get_one_film: get_one_film,
    search_film: search_film
}