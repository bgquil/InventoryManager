const db = require('./dbConfig');


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