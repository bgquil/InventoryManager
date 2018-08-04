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