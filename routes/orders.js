// Import database connection
const db = require('../config/db');

// Render orders main page.
exports.listOrders = (req, res) => {
  const stmt = 'SELECT * FROM inventory.orders';

  db.query(stmt, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.render('orders/orders', { title: 'Orders', orderData: result });
  });
};

exports.listRecentOrders = (req, res) => {
  const stmt = 'SELECT * FROM inventory.orders\
    WHERE orderTime >= DATE(NOW()) - INTERVAL 1 WEEK\
    ORDER BY ordertime DESC';

  db.query(stmt, (err, result) => {
    if (err) {
      throw err;
    }
    else {
      res.render('orders/orders', { title: 'Recent Orders', orderData: result });
    }
  });
};

exports.createOrder = (req, res) => {
  res.render('orders/create_order', { title: 'Create Order' })
};

exports.completeOrder = (req, res) => {
  const orderList = JSON.parse(JSON.stringify(req.body));

  //order list length

  // need to count total number of items
  const orderStmt = 'call insert_order(?)';
  const itemStmt = 'INSERT INTO order_item (orderID, itemID, quantityOrdered) VALUES (?, ?, ?);'


  db.query(orderStmt, 10, (err, result) => {
    const orderID = result[0][0].orderID;
    orderList.forEach((order_item) => {
      const values = [orderID, order_item.itemID, order_item.quantity]
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

  const orderStmt = 'SELECT * FROM orders WHERE orderID = ?'

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
            console.log(itemsResult);
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