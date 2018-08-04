const db = require('./dbConfig');

exports.getOrders = () => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM orders LIMIT 10;';
    db.query(orderStmt, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getOrder = (orderID) => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM orders WHERE orderID = ?;';
    db.query(orderStmt, orderID,  (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

// Create a new order inserting its total quantity and return its ID.
exports.createOrder = (totalQuantity) => {
  return new Promise( (reject, resolve) => {
    const stmt = 'INSERT INTO orders SET totalQuantity=?'
    db.query(stmt, totalQuantity, (err, result) => {
      if (err)
        return reject(err);
      return resolve(result);
    });
  });
}

exports.setupOrder = (orderList) => {
  // create order and retrieve its ID  
  createOrder(orderList.length).then((data) => {
    const orderId = data.insertId;
    // Add each item in orderList to the order_item table
    orderList.forEach((orderItem) => {
      const values = [orderID, orderItem.itemID, orderItem.quantity];
      db.query(itemStmt, values, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  }).catch(err => setImmediate((err) => {throw err}));
};


// Get items within an order
exports.getOrderItems = (orderID) => {
  const itemStmt = 'SELECT * FROM order_item\
                        INNER JOIN orders ON orders.OrderID = order_item.OrderID\
                        INNER JOIN items ON order_item.itemID = items.itemID\
                        INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID\
                        WHERE order_item.orderID = ?';
  return new Promise((resolve, reject) => {
    db.query(itemStmt, orderID, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};