const express = require('express');
const app = express();

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
app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message 
    });
});

module.exports = app;
