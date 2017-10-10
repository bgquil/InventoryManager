

exports.listItems = (req, res) => {
    let sql = 'SELECT * FROM inventory.items;';
    req.db.query(sql, (err, result) => {
        if (err) 
            console.log(err);
        res.render('items', {
            title: 'items',
            data: result
        });

    });
};