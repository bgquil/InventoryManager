// Import database connection
const db = require('../config/db');

// Render the manufacturers main view.
exports.manufacturersMain = (req, res) => {
    const stmt = 'SELECT * FROM inventory.manufacturers;';
    db.query(stmt, (err, result) => {
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
    db.query(stmt, (err, result) => {
        if (err) throw err;
        res.send({manufacturerData: result});
    });
};



// Add a new manufacturer to the database.
exports.addManufacturer = (req, res) => {
    const stmt = "INSERT INTO inventory.manufacturers SET ?";
    let input = JSON.parse(JSON.stringify(req.body));
    let object = { manufacturerName: input.manufacturerName };

    db.query(stmt, object, (err, rows) => {
        if (err)
            console.log("Error inserting new manufacturer: %s", err);
        
    });
    res.redirect('/manufacturers');
};


// Remove a manufacturer from the database.
exports.deleteManufacturer = (req, res) => {
    const stmt = "DELETE FROM inventory.manufacturers WHERE manufacturerID = ?";
    let id = parseInt(req.params.id, 10);

    if (id === parseInt(id, 10)){
        db.query(stmt, id, (err, rows) => {
            if (err)
                console.log("Error deleting manufacturer: %s", err);
        });
    }
    else{
        console.log("%s is not a proper ID for deletion.", id);
    }
    res.redirect('/manufacturers');
};

// Render the edit manufacturer view
exports.renderEdit = (req, res) => {
    const stmt = 'SELECT * FROM manufacturers WHERE manufacturerID = ?';
    
        db.query(stmt,req.params.id, (err, result) => {
                res.render('manufacturers/edit_manufacturer', {
                    title: 'Edit Manufacturer',
                    manufacturerData: result
                });
        });
};

// Apply edit to manufacturer
exports.editManufacturer = (req, res) => {
    const stmt = 'UPDATE manufacturers SET ? WHERE manufacturerID = ?';
    const manufacturerEdits = JSON.parse(JSON.stringify(req.body));

    db.query(stmt, [manufacturerEdits, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.redirect('/manufacturers');
        }
    });
    



};


const getManufacturer = (id, callback) => {
    const stmt = 'SELECT * from manufacturers WHERE manufacturerID = ?';
    db.query(stmt, id, (err, result) => {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
};

exports.getManufacturerList = (callback) => {
    const stmt = 'SELECT * from manufacturers ORDER BY manufacturerName';
    db.query(stmt, (err, result) => {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
};
