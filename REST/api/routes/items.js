const express = require('express');
const router = express.Router();

const itemDB = require('../db/itemsDB');

router.get('/', (req, res, next) => {
    itemDB.getItems().then( (data) => {
    res.status(200).json(data);
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'item post',
    });
});

router.get('/:itemID', (req, res, next) => {
    
});