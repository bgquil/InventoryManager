
const db = require('../../config/db');

exports.manufacturers_get_all = (req, res, next) => {
    const stmt = 'SELECT * FROM inventory.manufacturers;';
    db.query(stmt, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json({
            data: result
        });
    });
    
};

exports.manufacturers_


