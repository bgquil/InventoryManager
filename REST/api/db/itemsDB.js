const db = require('./dbConfig')

// get all items
exports.getItems = () => {
    return new Promise((resolve, reject) => {
        const stmt = 'SELECT * FROM items;'
        db.query(stmt, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

// get a single item;
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

// Add an item to the items table
exports.addItem = (newItem) => {
    const stmt = "INSERT INTO items SET ?;";
    return new Promise((resolve, reject) => {
        db.query(stmt, newItem, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};