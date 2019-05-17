import Api from './Api';

export default {
    get_one_film: async(_id) => {
        try {
            const res = await Api().get('/get_one_film?_id=' + _id);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    // get_films: async(index) => {
    //     console.log('getting films...');
    //     try {
    //         const res = await Api().get('/get_films?film_index=' + index);
    //         console.log('already got films in getservice: ' + res.data);
    //         return res.data;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },

    get_films: async(index) => {
        await Api().get('/get_films?film_index=' + index).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
    },

    search_film: async(name) => {
        try {
            const res = await Api().post('/search_film', {
                name: name
            });
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
}