const express = require('express');
const router =  express.Router();
const manufacturersDB = require('../db/manufacturersDB');


router.get('/', (req, res, next) => {
    manufacturersDB.getAllManufacturers().then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err; }));
});

router.get('/:manufacturerID', (req, res, next) => {
    manufacturersDB.getManufacturer(req.params.manufacturerID).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err; }));
});

router.delete('/:manufacturerID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted Manufacturer',
    });
});

router.post('/', (req, res, next) => {
    const manufacturer = {
        manufacturerName: req.body.manufacturerName,
    }
    manufacturersDB.addManufacturer(manufacturer).then((data) => {
    }).catch(err => setImmediate( () => { 
        res.status(500).json(err); 
        }));
});


module.exports = router;

