const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept Authorization');
    if (req.method ===  'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const manufacturersRoute = require('./api/routes/manufacturers');
const itemsRoute = require('./api/routes/items.js');
const ordersRoute = require('./api/routes/orders');

app.use('/manufacturers', manufacturersRoute);
app.use('/items', itemsRoute);
app.use('/orders', ordersRoute);

// 404 Not Found
app.use((req,res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message 
    });
});

module.exports = app;
