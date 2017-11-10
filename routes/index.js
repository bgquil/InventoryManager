// Import database connection
const db = require('../config/db');

// Get Index
exports.index = function(req, res){
    res.render('index', {title: 'Root Index'});
};