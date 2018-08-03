const express = require('express');
const router = express.Router();

const ordersDB = require('../db/ordersDB');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "order get placeholder"
    })
});

module.exports = router;
