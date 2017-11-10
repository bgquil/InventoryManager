// Import database connection
const db = require('../config/db');
const manufacturers = require('./manufacturers');


// Render the items main view
exports.renderItemsMain = (req, res) => {
    let stmt = 'SELECT * FROM items INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID';
    
    db.query(stmt, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.render('items/items.ejs', {
                title: 'Manage Items',
                data: result
            });
        }
    });
};

exports.searchItems = (req, res) => {
    const stmt = 'SELECT * from items INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID WHERE ?? = ?';
    let input = JSON.parse(JSON.stringify(req.body));

    let searchType = '';
    const searchString = input.itemSearchString;
    switch(input.itemSearchType) {
        case 'Manufacturer':
            searchType = 'manufacturerName';
            break;
        case 'Name':
            searchType = 'name';
            break;
        case 'Model':
            searchType = 'model';
            break;
    }

    const placeVals = [searchType, searchString];
    
    db.query(stmt, placeVals , (err, result) => {
        if (err)
            console.log(err);
        res.send({searchData: result});
    });
};


// Render add item page
exports.add = (req, res) => {
    const stmt = "SELECT * FROM inventory.manufacturers ORDER BY manufacturerName;"
    db.query(stmt, (err, result) => {
        if (err) throw err;
        res.render('items/add_item', {
            title: 'Add Item',
            manufacturerData: result
            });
    });

};
 

// Add an item to the items table
exports.addItem = (req, res) => {
    let stmt = "INSERT INTO inventory.items SET ?"
    let input = JSON.parse(JSON.stringify(req.body));

    let object = { 
        manufacturerID: input.manufacturerID, //examine
        name: input.name,
        model: input.model,
        weight: input.weight,
        price: input.price,
        quantity: input.quantity
     };
     
    db.query(stmt, object, (err, rows) => {
        if (err)
            console.log("Error inserting new item: %s", err);
    });
    res.redirect('/items');
};

exports.removeItem = (req, res) => {
    res.redirect('/items');
};



exports.editItem = (req, res) => {
    // const stmt = 'SELECT * FROM items INNER JOIN\
    //     manufacturers ON items.manufacturerID = manufacturers.manufacturerID WHERE itemID = ?';
    // const stmt2 = "SELECT * FROM inventory.manufacturers ORDER BY manufacturerName;"
    // manufacturers = null;
    // db.query(stmt2, (err, result) => {
    //     if (err) throw err;
    //         manufacturers = result;
            
    // });

    getItem(req.params.id, (err, item) => {
        if (err) {
            throw err;
        }
        else {
            manufacturers.getManufacturerList((err, mList) => {
                if (err) {
                    throw err;
                }
                else {
                    res.render('items/edit_item', {
                        title: 'Edit Item',
                        itemData: item,
                        manufacturerData : mList
                    });
                }
            });
        }
    });
};

exports.applyEdit = (req, res) => {
    const stmt = "UPDATE items SET ? WHERE itemID=?"
    let input = JSON.parse(JSON.stringify(req.body));
    item = {
        manufacturerID : input.manufacturerID,
        name : input.name,
        model : input.model,
        weight : input.weight, 
        price : input.price,
        quantity : input.quantity,
    };

    db.query(stmt, [item, input.itemID] , (err, result) => {
        if(err)
            throw err;
        res.redirect('/items');
    });

};

// Render delete confirmation view
exports.renderDelete = (req, res) => {
    const stmt = 'SELECT * FROM items INNER JOIN\
        manufacturers ON items.manufacturerID = manufacturers.manufacturerID WHERE itemID = ?';

    db.query(stmt, req.params.id, (err, result) => {
        if (err) throw err;
        res.render('items/delete_item', {
            title: 'Delete Item',
            itemData: result,
        });
    });

};

// Apply deletion to database
exports.applyDelete = (req, res) => {
    let stmt = '';

    console.log('apply deletion');

};

const getItem = (id, callback) => {
    const stmt = 'SELECT * FROM items WHERE itemID = ?';
    db.query(stmt, id, (err, result) => {
        if (err) 
            callback(err, null);
        else  
            callback(null, result);
    });
};