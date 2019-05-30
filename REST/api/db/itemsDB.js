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

// Get all items from a manufacturer
exports.getItemByManufacturer = (manufacturerID) => {
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

// Search Items
exports.searchItem = (search) => {
    console.log(search);
    //const stmt = 'SELECT * from items INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID WHERE ?? = ?';
    const stmt = 'SELECT * from items INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID WHERE manufacturerName = ?';
    return new Promise((resolve, reject) => {
        db.query(stmt, 'Cobalt LLC', (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};