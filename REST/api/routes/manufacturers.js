const express = require('express');
const router =  express.Router();
const manufacturersDB = require('../db/manufacturers');


router.get('/', (req, res, next) => {
    res.status(200).json({
        manufacturerName: 'GET placeholder',
    });
});

router.get('/:id', (req, res, next) => {
    manufacturersDB.getManufacturer(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err; }));
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        manufacturerName: 'POST Placeholder',
    });
});


module.exports = router;

