
exports.listItems = (req, res) => {
    // let sql = 'SELECT * FROM inventory.items;';
    let stmt = 'SELECT * FROM items INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID';
    
    req.db.query(stmt, (err, result) => {
        if (err) 
            console.log(err);
        console.log(result);
        res.render('items', {
            title: 'Manage Items',
            data: result
        });
    });
};


exports.searchItems = (req, res) => {
    // let sql = 'SELECT * FROM inventory.items;';
    // let sql = 'SELECT * FROM items INNER JOIN manufacturers ON items.manufacturer_id = manufacturers.id';
    let stmt = 'SELECT * FROM items INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID WHERE quantity=100  '
    let input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    
    let queryObject = {
        searchQuery : input.searchQuery,
        searchBy : input.searchBy
    }
    req.db.query(stmt, (err, result) => {
        if (err)
            console.log(err);
            res.render('items', {
                title: 'ManageItems',
                data: result
            });
    });
    // console.log(req.query);
    
};

exports.searchRedirect = (req, res) => {
    res.redirect('/items');
};

// Render add item page
exports.add = (req, res) => {
    let stmt = "SELECT * FROM inventory.manufacturers;"
    req.db.query(stmt, (err, result) => {
        if (err) throw err;
        res.render('add_item', {
            title: 'Add Item',
            manufacturerData: result
            });
    });

};
 

/*
 * Add an item to the database.
 *
 */
exports.addItem = (req, res) => {
    let stmt = "INSERT INTO inventory.items SET ?"
    let input = JSON.parse(JSON.stringify(req.body));
    let object = { 
        manufacturerID: input.manufacturer_id, //examine
        name: input.name,
        model: input.model,
        weight: input.weight,
        price: input.price,
        quantity: input.quantity
     };
     
    // TODO: NOT WORKING
    // req.db.query(stmt, object, (err, rows) => {
    //     if (err)
    //         console.log("Error inserting new item: %s", err);
    // });
    res.redirect('/items');
};

exports.removeItem = (req, res) => {
    res.redirect('/items');
};

exports.editItem = (req, res) => {
    let stmt = 'SELECT * FROM items INNER JOIN manufacturers ON items.manufacturerID_FK = manufacturers.id';
    
    req.db.query(stmt, (err, result) => {
        if (err) 
            console.log(err);
        res.render('edit_item', {
            title: 'Edit Item',
            data: result
        });
    });


};

exports.applyEdit = (req, res) => {

    console.log(res.data);

};