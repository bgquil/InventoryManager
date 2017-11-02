

// Render the manufacturers main view.
exports.manufacturersMain = (req, res) => {console.log('List request');
    const stmt = 'SELECT * FROM inventory.manufacturers;';
    req.db.query(stmt, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.render('manufacturers/manufacturers', {
            title: 'manufacturers',
             manufacturerData: result
            });
    });

};

// Query and send all manufacturers.
exports.getManufacturers = (req, res) => {
    const stmt = 'SELECT * FROM inventory.manufacturers;';
    req.db.query(stmt, (err, result) => {
        if (err) throw err;
        res.send({manufacturerData: result});
    });
};



// Add a new manufacturer to the database.
exports.addManufacturer = (req, res) => {
    const stmt = "INSERT INTO inventory.manufacturers SET ?";
    let input = JSON.parse(JSON.stringify(req.body));
    let object = { manufacturerName: input.manufacturerName };

    req.db.query(stmt, object, (err, rows) => {
        if (err)
            console.log("Error inserting new manufacturer: %s", err);
        
    });
    res.redirect('/manufacturers');
};


// Remove a manufacturer from the database.
exports.deleteManufacturer = (req, res) => {
    const stmt = "DELETE FROM inventory.manufacturers WHERE manufacturerID = ?";
    let id = parseInt(req.params.id, 10);

    if (id === parseInt(id, 10))
        req.db.query(stmt, id, (err, rows) => {
            if (err)
                console.log("Error deleting manufacturer: %s", err);
        });
    else
        console.log("%s is not a proper ID for deletion.", id);

    res.redirect('/manufacturers');
};

// Edit a manufacturer's details.
exports.editManufacturer = (req, res) => {

    const stmt = ""
    console.log("edit request on "+req.params.id);
    res.redirect('/manufacturers');


};
