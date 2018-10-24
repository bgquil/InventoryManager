const express = require('express');
const router =  express.Router();
const manufacturersDB = require('../db/manufacturersDB');
const itemsDB = require('../db/itemsDB');


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
router.delete('/:manufacturerID/delete', (req, res, next) => {
    const id = req.params.manufacturerID;
    manufacturersDB.deleteManufacturer(id).then((data) => {
        res.status(200).json({
        message: 'Manufacturer Deleted',
        id
        });
    }).catch(err => setImmediate(() => {throw err;}));
});

// Add a new manufacturer
router.post('/add', (req, res, next) => {
    const manufacturer = {
        manufacturerName: req.body.manufacturerName,
    }
    manufacturersDB.addManufacturer(manufacturer).then((data) => {
        res.status(200).json({
            message: 'Add OK'
        });
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
        res.status(200).json({
            message: "Edit OK"
        });
    }).catch(err => setImmediate( () => {res.status(500).json(err)}));
});

router.get('/:manufacturerID/items', (req, res, next) => {
    const manufacturerID = req.params.manufacturerID;
    itemsDB.getItemByManufacturer(manufacturerID).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate( () => {res.status(500).json(err)}));
});


module.exports = router;

