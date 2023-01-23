const express = require('express');
const cors = require('cors');
const products = require('./shop-data.json');
const app = express();
const PORT = process.env.PORT || 3030;
app.use(express.json());
app.use(cors());

const reload = async () => {
    await console.log("Refresh");
    await setTimeout(() => {
        reload();
    }, 2000);
}


reload();

app.get('/', (req,res) =>{
    res.json(products);
})







/*
app.post('/signin', (req, res) => {

    // Load hash from your password DB.
    bcrypt.compare("apples", '$2a$10$SQ7941KHrEgJ8CzJq95F5.rkq6Dliw0tLBtFX7ILqCU2JiPgWSVBG', function(err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$SQ7941KHrEgJ8CzJq95F5.rkq6Dliw0tLBtFX7ILqCU2JiPgWSVBG', function(err, res) {
        console.log('second guess', res);
    });

    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else{
        res.status(400).json('error logging in');
    }
    res.json('signing');
});
*/
app.get('/products/:key/:cantidad', (req,res) => {
    const {key, cantidad} = req.params;
    console.log(req.params);
    //console.log(key);
    //console.log('Others');
    products.forEach(product => {
        //console.log(product.key)
        if(product.key === key){
            console.log(product);
            console.log(product.existences);
            product.existences = product.existences - cantidad;
            console.log(product.existences);
            return res.json(product.existences);
        }
    });
    //return res.status(404).json('no such product');
});

app.get('/recproducts/:key/:cantidad', (req,res) => {
    const {key, cantidad} = req.params;
    console.log(req.params);
    products.forEach(product => {
        if(product.key === key){
            console.log(product.existences);
            product.existences = product.existences + parseInt(cantidad);
            console.log(product.existences);
            return res.json(product.existences);
        }
    });


    //return res.status(404).json('no such product');
});
app.get('/resproducts/:key/:cantidad', (req,res) => {
    const {key, cantidad} = req.params;
    console.log(req.params);
    products.forEach(product => {
        if(product.key === key){
            console.log(product.existences);
            product.existences = product.existences - parseInt(cantidad);
            console.log(product.existences);
            return res.json(product.existences);
        }
    });


    //return res.status(404).json('no such product');
});





/*

app.put('/image', (req,res) => {
    const {id} = req.body;
    database.users.forEach(user => {
        if(user.id === id){
            user.entries++;
            return res.json(user.entries);
        }
    });
    return res.status(404).json('no such user');
});*/

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

