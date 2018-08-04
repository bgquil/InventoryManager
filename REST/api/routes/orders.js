const express = require('express');
const router = express.Router();

const ordersDB = require('../db/ordersDB');

router.get('/', (req, res, next) => {
    ordersDB.getOrders().then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err;}))
});

router.get('/:orderID', (req, res, next) => {
    ordersDB.getOrder(req.params.orderID).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err;}))

});

router.post('/', (req, res, next) => {
    const newOrder = {
        message: 'test'
    }
    ordersDB.addOrder(newOrder).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err;}))

});
module.exports = router;
