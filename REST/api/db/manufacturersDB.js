const db = require('./dbConfig');


exports.getManufacturer = (manufacturerID) => {
  return new Promise((resolve, reject) => {
    const stmt = 'SELECT * FROM manufacturers WHERE manufacturerID = ?';
    db.query(stmt, manufacturerID, (err, result) => {
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

exports.editManufacturer = (manufacturerID, newName) => {
  const stmt = 'UPDATE manufacturers SET manufacturerName = ? WHERE manufacturerID = ?';
  return new Promise((resolve, reject) => {

    db.query(stmt, [newName, manufacturerID], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}