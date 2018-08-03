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

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'item post',
    });
});

router.get('/:itemID', (req, res, next) => {
    itemDB.getItem(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => {throw err;}))
});


module.exports = router;