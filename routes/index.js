// Import database connection
const db = require('../config/db');
const ord = require('./orders');

// Get Index
exports.index = (req, res) => {
  ord.getRecentOrders().then((data) => {
    res.render('index', { title: 'Root Index', orderData: data });
  }).catch((err) => setImmediate(() => { throw err; }));
};
