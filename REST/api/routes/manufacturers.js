const express = require('express');
const router =  express.Router();
const manufacturersDB = require('../db/manufacturersDB');


// List all manufacturers
router.get('/', (req, res, next) => {
    manufacturersDB.getAllManufacturers().then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err; }));
});

// Get a single manufacturer by ID
router.get('/:manufacturerID', (req, res, next) => {
    manufacturersDB.getManufacturer(req.params.manufacturerID).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err; }));
});

// Delete a manufacturer by ID
router.delete('/:manufacturerID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted Manufacturer',
    });
});

// Add a new manufacturer
router.post('/add', (req, res, next) => {
    const manufacturer = {
        manufacturerName: req.body.manufacturerName,
    }
    manufacturersDB.addManufacturer(manufacturer).then((data) => {
    }).catch(err => setImmediate( () => { 
        res.status(500).json(err); 
        }));
});

// Edit an existing manufacturer
router.post('/:manufacturerID/edit', (req, res, next) => {
    const manufacturer = {
        manufacturerName: req.body.manufacturerName,
    }
    manufacturersDB.editManufacturer(req.params.manufacturerID, req.body.manufacturerName).then((data) => {

    }).catch(err => setImmediate( () => {res.status(500).json(err)}));
});


module.exports = router;

