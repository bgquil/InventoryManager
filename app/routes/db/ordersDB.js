const db = require('../../config/db');

// Get all orders
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

// Get orders between two dates
exports.getOrdersDate = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM orders WHERE orderTime>=? and orderTime<=?;';
    db.query(orderStmt, [startDate, endDate], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

// Get orders between two dates with status
exports.getOrdersDateStatus = (startDate, endDate, fulfilled) => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM orders WHERE orderTime>=? and orderTime<=? and orderFulfilled = ?;';
    db.query(orderStmt, [startDate, endDate, fulfilled], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};


// Get the week's orders
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

exports.getOpenOrders = () => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT * FROM inventory.orders WHERE orderFulfilled = 0';
    db.query(orderStmt, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getOpenOrdersCount = () => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT COUNT(*) FROM inventory.orders WHERE orderFulfilled = 0';
    db.query(orderStmt, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getRecentOrdersCount = () => {
  return new Promise((resolve, reject) => {
    const orderStmt = 'SELECT COUNT(*) FROM inventory.orders\
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


// Get a single order
exports.getOrder = (orderID) => {
  const orderStmt = 'SELECT * FROM orders WHERE orderID = ?';
  return new Promise((resolve, reject) => {
    db.query(orderStmt, orderID, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
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

exports.getOrderInvoice = (orderID) => {
  return Promise.all([exports.getOrder(orderID), exports.getOrderItems(orderID)]);
};


exports.getNextOrderID = (orderListLength) => {
  const orderStmt = 'insert into orders SET totalQuantity=? '; 
  return new Promise((resolve, reject) => {
    db.query(orderStmt, orderListLength, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.fulfillOrder = (orderID) => {
  return new Promise((reject, resolve) => {
    const orderStmt = 'UPDATE orders SET orderFulfilled = 1 WHERE orderID = ?';
    db.query(orderStmt, orderID, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};