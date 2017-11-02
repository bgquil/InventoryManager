
// Render the items main view
exports.itemsMain = (req, res) => {
    let stmt = 'SELECT * FROM items INNER JOIN manufacturers ON items.manufacturerID = manufacturers.manufacturerID';
    
    req.db.query(stmt, (err, result) => {
        if (err) 
            console.log(err);
        //console.log(result);
        res.render('items/items.ejs', {
            title: 'Manage Items',
            data: result
        });
    });
};

exports.renderItemsLanding = (req, res) => {
    res.render('items/items', {
        title: 'Manage Items',
        data: {}
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
    
    req.db.query(stmt, placeVals , (err, result) => {
        if (err)
            console.log(err);
        res.send({searchData: result});
    });
};


// Render add item page
exports.add = (req, res) => {
    let stmt = "SELECT * FROM inventory.manufacturers;"
    req.db.query(stmt, (err, result) => {
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

    console.log(input.manufacturerID);
    let object = { 
        manufacturerID: input.manufacturerID, //examine
        name: input.name,
        model: input.model,
        weight: input.weight,
        price: input.price,
        quantity: input.quantity
     };
     
    req.db.query(stmt, object, (err, rows) => {
        if (err)
            console.log("Error inserting new item: %s", err);
    });
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
        res.render('items/edit_item', {
            title: 'Edit Item',
            data: result
        });
    });


};

exports.applyEdit = (req, res) => {

    console.log(res.data);

};