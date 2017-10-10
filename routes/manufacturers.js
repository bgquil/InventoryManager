


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

exports.addManufacturer = (req, res) => {

    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
};

