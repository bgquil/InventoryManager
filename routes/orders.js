// Import database connection
const db = require('../config/db');


exports.listOrders = (req, res) => {
  exports.getRecentOrders().then((data) => {
    res.render('orders/orders', { title: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};
// Render orders main page.
exports.listRecentOrders = (req, res) => {
  exports.getRecentOrders().then((data) => {
    res.render('orders/orders', { title: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};

// Render orders search page.
exports.searchOrders = (req, res) => {
  exports.getRecentOrders().then((data) => {
    res.render('orders/search_order', { title: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};

// Render create order page
exports.createOrder = (req, res) => {
  res.render('orders/create_order', { title: 'Create Order' });
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

  let orderID = parseInt(req.params.id, 10);

  let itemsResult = {};
  let orderResult = {};

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
  else {
    console.log('%s is not a proper order ID.', orderID);
  }
};

exports.fulfillOrder = (req, res) => {
  const orderStmt = 'UPDATE orders SET orderFulfilled = 1 WHERE orderID = ?';
  db.query(orderStmt, req.params.orderID, (err, result) => {
    if (err) {
      throw (err);
    }
    res.redirect('/orders/view/' + req.params.orderID);
  });
};


// Direct DB Queries
//

exports.getOrders = () => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM orders;';
    db.query(orderStmt, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getOrdersDate = () => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM orders WHERE orderTime>=? and orderTime<=?;';
    const start = '2017-02-02';
    const end = '2018-01-01';
    db.query(orderStmt, [start, end], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getRecentOrders = () => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM inventory.orders\
    WHERE orderTime >= DATE(NOW()) - INTERVAL 1 WEEK\
    ORDER BY ordertime DESC';
    db.query(orderStmt, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getOrders = (orderID) => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM order_item\
    INNER JOIN orders ON orders.OrderID = order_item.OrderID\
    INNER JOIN items ON order_item.itemID = items.itemID\
    INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID\
    WHERE order_item.orderID = ?'
    db.query(orderStmt, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
