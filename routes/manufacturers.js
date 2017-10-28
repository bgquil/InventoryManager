


exports.listManufacturers = (req, res) => {
    const sql = 'SELECT * FROM inventory.manufacturers;';
    req.db.query(sql, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.render('manufacturers', {
            title: 'manufacturers',
             manufacturerData: result
            });
    });

};

exports.getManufacturers = (req, res) => {
    const sql = 'SELECT * FROM inventory.manufacturers;';
    req.db.query(sql, (err, result) => {
        if (err) throw err;
        return result;
    });
};



/*
 * Add a manufacturer to the database.
 *
 */
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

exports.deleteManufacturer = (req, res) => {
    const stmt = "DELETE FROM inventory.manufacturers WHERE id = ?";
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

exports.editManufacturer = (req, res) => {

    const stmt = ""
    console.log("edit request on "+req.params.id);
    res.redirect('/manufacturers');


};

const updateManufacturers = (data) => {
    let table = document.getElementById("table_manufacturers");
    table.innerHTML = data;
}
