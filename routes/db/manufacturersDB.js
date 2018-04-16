const db = require('../../config/db');

exports.getManufacturers = () => {
  return new Promise((resolve, reject) => {
    const stmt = 'SELECT * FROM manufacturers;';
    db.query(stmt, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getManufacturer = (manufacturerID) => {
  return new Promise((resolve, reject) => {
    const stmt = 'SELECT * FROM manufacturers WHERE manufacturerID = ?;';
    db.query(stmt, manufacturerID, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.deleteManufacturer = (manufacturerID) => {
  const deleteStmt = 'DELETE FROM inventory.manufacturers WHERE manufacturerID = ?';
  db.query(deleteStmt, manufacturerID, (err, result) => {
    if (err) {
      throw err;
    }
    return result;
  });
};