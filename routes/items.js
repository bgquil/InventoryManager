

exports.listItems = (req, res) => {
    // let sql = 'SELECT * FROM inventory.items;';
    let sql = 'SELECT * FROM items INNER JOIN manufacturers ON items.manufacturer_id = manufacturers.id';
    
    req.db.query(sql, (err, result) => {
        if (err) 
            console.log(err);
        console.log(result);
        res.render('items', {
            title: 'items',
            data: result
        });

    });
};


/*
 * Add a manufacturer to the database.
 *
 */
exports.addItem = (req, res) => {
    let stmt = "INSERT INTO inventory.items SET ?"
    var input = JSON.parse(JSON.stringify(req.body));
    // var object = { name: input.name };

    // req.db.query(stmt, object, (err, rows) => {
    //     if (err)
    //         console.log("Error inserting new manufacturer: %s", err);
    //     res.redirect('/manufacturers');
    // });
    console.log('apple');
};