const db = require('./dbConfig')

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
exports.addItem = (itemData) => {
    const stmt = 'INSERT INTO inventory.items SET ?'
    const input = JSON.parse(JSON.stringify(req.body));
  
    const object = {
      manufacturerID: input.manufacturerID, //examine
      name: input.name,
      model: input.model,
      weight: input.weight,
      price: input.price,
      quantity: input.quantity,
    };
  
    db.query(stmt, object, (err, rows) => {
      if (err) {
        console.log('Error inserting new item: %s', err);
      }
    });
    res.redirect('/items');
  };