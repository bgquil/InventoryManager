// Import database connection
const db = require('../config/db');
const ordersDB = require('./db/ordersDB');

// Render orders main page.
exports.listRecentOrders = (req, res) => {
  ordersDB.getRecentOrders().then((data) => {
    res.render('orders/orders', { title: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};

// Render orders main page.
exports.renderOpenOrders = (req, res) => {
  ordersDB.getOpenOrders().then((data) => {
    res.render('orders/view_open_order', { title: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};

// Render orders search page.
exports.searchOrdersView = (req, res) => {
  ordersDB.getRecentOrders().then((data) => {
    res.render('orders/search_order', { title: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};

// Render create order page
exports.createOrder = (req, res) => {
  res.render('orders/create_order', { title: 'Create Order' });
};

exports.listOrders = (req, res) => {
  ordersDB.getRecentOrders().then((data) => {
    res.render('orders/orders', { title: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};

exports.completeOrder = (req, res) => {
  const orderList = JSON.parse(JSON.stringify(req.body));
  const orderStmt = 'call insert_order(?)';
  const itemStmt = 'INSERT INTO order_item (orderID, itemID, quantityOrdered) VALUES (?, ?, ?);'

  db.query(orderStmt, orderList.length, (err, result) => {
    const orderID = result[0][0].orderID;
    orderList.forEach((orderItem) => {
      const values = [orderID, orderItem.itemID, orderItem.quantity];
      db.query(itemStmt, values, (err, result) => {
        if (err) {
          throw err;
        }
      });
    });
    res.redirect('/orders');
  });
};

exports.viewOrder = (req, res) => {
  const itemStmt = 'SELECT * FROM order_item\
                        INNER JOIN orders ON orders.OrderID = order_item.OrderID\
                        INNER JOIN items ON order_item.itemID = items.itemID\
                        INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID\
                        WHERE order_item.orderID = ?'

  const orderStmt = 'SELECT * FROM orders WHERE orderID = ?';

  const orderID = parseInt(req.params.id, 10);
  const itemsResult = {};
  const orderResult = {};

  if (orderID === parseInt(orderID, 10)) {
    db.query(itemStmt, orderID, (err, itemsResult) => {
      if (err) {
        throw (err);
      }
      else {
        db.query(orderStmt, orderID, (err, orderResult) => {
          if (err) {
            throw (err);
          }
          else {
            res.render('orders/view_order', { title: 'Order View', orderData: orderResult, itemData: itemsResult });
          }
        });
      }
    });
  }
};

// Set an order's status as fulfilled
exports.fulfillOrder = (req, res) => {
  const orderStmt = 'UPDATE orders SET orderFulfilled = 1 WHERE orderID = ?';
  db.query(orderStmt, req.params.orderID, (err, result) => {
    if (err) {
      throw (err);
    }
    res.redirect('/orders/view/' + req.params.orderID);
  });
};

// Used for AJAX searching by date.
exports.orderSearch = (req, res) => {
  const input = JSON.parse(JSON.stringify(req.body));
  if (input.status === '*') {
    ordersDB.getOrdersDate(input.startDate, input.endDate, input.status).then((data) => {
      res.send({ orderData: data });
    });
  } else {
    ordersDB.getOrdersDateStatus(input.startDate, input.endDate).then((data) => {
      res.send({ orderData: data });
    });
  }
};
