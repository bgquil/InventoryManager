const express = require('express');
const router = express.Router();

const itemDB = require('../db/itemsDB');

router.get('/', (req, res, next) => {
    itemDB.getItems().then( (data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { 
        res.status(500).json({message: 'Internal Error'});
        throw err; 
    }));
});

router.post('/add', (req, res, next) => {
  const newItem = {
    manufacturerID: req.body.manufacturerID, //examine
    name: req.body.name,
    model: req.body.model,
    weight: req.body.weight,
    price: req.body.price,
    quantity: req.body.quantity,
  };
  itemDB.addItem(newItem).then((data) => {

  }).catch(err => setImmediate(() => {
      res.status(500);
      throw err;}))

    res.status(200).json(newItem);
});

// Get a single item
router.get('/:itemID', (req, res, next) => {
    itemDB.getItem(req.params.itemID).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => {throw err;}))
});

module.exports = router;