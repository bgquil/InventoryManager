const db = require('./dbConfig');

exports.getOrders = (status, start, end) => {
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

exports.getOrdersByStatus = (status) => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM orders WHERE orderFulfilled = ?;';
    db.query(orderStmt, status, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getOrdersSearch = (startDate, endDate, orderFulfilled) => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM orders WHERE orderTime>=? and orderTime<=? and orderFulfilled = ?;';
    console.log(startDate);
    console.log(endDate);
    console.log(orderFulfilled);
    const searchParameters = [startDate, endDate, orderFulfilled];
    db.query(orderStmt, searchParameters, (err, result) => {
      if (err) {
        return reject(err);
      }
      console.log(result);
      return resolve(result);
    });
  });
};

exports.getOrderData = (orderID) => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM orders WHERE orderID = ?;';
    db.query(orderStmt, orderID,  (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result[0]);
    });
  });
};

// Get items within an order
exports.getOrderItems = (orderID) => {
  const itemStmt = 'SELECT items.itemID, items.name, items.model,\
                        manufacturers.manufacturerID, manufacturers.manufacturerName,\
                        order_item.quantityOrdered\
                        FROM order_item\
                        RIGHT JOIN items ON order_item.itemID = items.itemID\
                        JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID\
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

// Return Order data and all items associated with an order.
exports.getOrder = (orderID) => {
  return Promise.all([exports.getOrderData(orderID), exports.getOrderItems(orderID)]);
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
};

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

