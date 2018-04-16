const db = require('../../config/db');

exports.getItem = (itemID) => {
  return new Promise((resolve, reject) => {
    const stmt = 'SELECT * FROM items WHERE itemID = ?;';
    db.query(stmt, itemID, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getItemsByManufacturer = (manufacturerID) => {
  return new Promise((resolve, reject) => {
    const stmt = 'SELECT * FROM items WHERE manufacturerID = ?;';
    db.query(stmt, manufacturerID, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getItemsByQuantity = (quantity) => {
  return new Promise((resolve, reject) => {
    const stmt = 'SELECT * FROM items WHERE quantity < ?;';
    db.query(stmt, quantity, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.searchItems = (placeVals) => {
  return new Promise((resolve, reject) => {
    const stmt = 'SELECT * from items INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID WHERE ?? = ?';
    db.query(stmt, placeVals, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
