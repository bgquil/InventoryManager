const db = require('./itemsdb')

exports.getItems = () => {
    return new Promise((resolve, reject) => {
        const stmt = 'SELECT * FROM ITEMS;'
        db.query(stmt, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

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
