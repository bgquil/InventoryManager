
const db = require('../../config/db');
const tableName = 'inventory.manufacturers';
exports.manufacturers_get_all = (req, res, next) => {
    const stmt = 'SELECT * FROM ' + tableName + ';';
    db.query(stmt, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        else {
            return res.status(200).json({
                data: result
            });
        }
    });
    
};

exports.manufacturers_get_single = (req, res, next) => {
    const stmt = 'SELECT * FROM '+ tableName + ' WHERE manufacturerID = ?;';
    db.query(stmt, req.params.manufacturerID, (err, result) => {
        if (err) {
            res.status(500).json({
                message: err,
            });
        }
        else {
            res.status(200).json({
                data: result
            });
        }
    })
};


