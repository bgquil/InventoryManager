const express = require('express');
const app = express();

const manufacturersRoutes = require('./api/routes/manufacturers');

app.use('/manufacturers', manufacturersRoutes);


app.use((req, res, next) => {
    res.status(200).json({
        message: 'OK',
    });

});


module.exports = app;
