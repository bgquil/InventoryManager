


exports.listManufacturers = (req, res) => {
    let sql = 'SELECT * FROM inventory.manufacturers;';
    req.db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('manufacturers', {
            title: 'manufacturers',
             data: result
            });
    });

};



/*
 * Add a manufacturer to the database.
 *
 */
exports.addManufacturer = (req, res) => {
    let stmt = "INSERT INTO inventory.manufacturers SET ?"
    var input = JSON.parse(JSON.stringify(req.body));
    var object = { manufacturerName: input.manufacturerName };

    req.db.query(stmt, object, (err, rows) => {
        if (err)
            console.log("Error inserting new manufacturer: %s", err);
        res.redirect('/manufacturers');
    });
};

