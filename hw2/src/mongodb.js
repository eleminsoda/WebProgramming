var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
let url = '47.103.96.205';
let port = '27017';
let user_name = 'root';
let pwd = '58479958yH';

let database = null;


let get_films = function(page_index) {
    let start_index = (page_index - 1) * 20;
    return MongoClient.connect('mongodb://' + user_name + ':' + pwd + '@' + url + ':' + port + '/' + 'films').then(function(db) {
        database = db;
        // let cursor = database.db('films').collection('films').find().skip(start_index).limit(10);
        let cursor = database.db('films').collection('films').find();
        return cursor.toArray();
    }).then(function(items) {
        console.log('Already got items...');
        database.close();
        result = items;
        return items;
    });
};

let get_one_film = function(_id) {
    return MongoClient.connect('mongodb://' + user_name + ':' + pwd + '@' + url + ':' + port + '/' + 'films').then(function(db) {
        database = db;
        let cursor = database.db('films').collection('films').find({
            "_id": _id
        });
        return cursor.toArray();
    }).then(function(items) {
        console.log('Already got items...');
        database.close();
        return items;
    })
};

let search_film = function(name) {
    return MongoClient.connect('mongodb://' + user_name + ':' + pwd + '@' + url + ':' + port + '/' + 'films').then(function(db) {
        database = db;
        let cursor = database.db('films').collection('films').find({
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
// let a = get_films(2);
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