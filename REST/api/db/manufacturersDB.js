const db = require('./dbConfig');


exports.getManufacturer = (id) => {
  return new Promise((resolve, reject) => {
    const stmt = 'SELECT * FROM manufacturers WHERE manufacturerID = ?';
    db.query(stmt, id, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getAllManufacturers = () => {
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

exports.addManufacturer = (manufacturer) => {
  return new Promise((resolve, reject) => {
    const stmt = 'Insert into manufacturers SET ?;';
    db.query(stmt, manufacturer, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};