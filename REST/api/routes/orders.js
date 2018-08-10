const express = require('express');
const router = express.Router();

const ordersDB = require('../db/ordersDB');

// get a list of orders
router.get('/', (req, res, next) => {
    ordersDB.getOrders().then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err;}))
});

router.get('/open', (req, res, next) => {
    const status = 0;
    ordersDB.getOrdersByStatus(status).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err;}))
});

router.get('/fulfilled', (req, res, next) => {
    const status = 1;
    ordersDB.getOrdersByStatus(status).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err;}))
});

router.get('/search', (req, res, next) => {
    let orderFulfilled = req.query.status;  
    let start = req.query.start;  
    let end = req.query.end;  

    if (!orderFulfilled || orderFulfilled != 1 || orderFulfilled !=0) {
        orderFulfilled = '0'
    }
    if (!start)
        start = '01/01/2017';
    if (!end)
        start = '01/01/2100';

    ordersDB.getOrders(orderFulFilled, start, end).then((data) => {
        res.status(200).json(data);
    }).catch(err => setImmediate(() => { throw err;}))
});

// get order metadata
router.get('/:orderID', (req, res, next) => {
    ordersDB.getOrderData(req.params.orderID).then((orderData) => {
        res.status(200).json(orderData);
    }).catch(err => setImmediate(() => { throw err;}))

});

// return order metadata and order items list
router.get('/:orderID/invoice', (req, res, next) => {
    ordersDB.getOrder(req.params.orderID).then((order) => {
        res.status(200).json({
            orderData: order[0],
            orderItems: order[1],
        });
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
