// Import database connection
const ordersDB = require('./db/ordersDB');

// Get Index
exports.index = (req, res) => {
  ordersDB.getRecentOrders().then((data) => {
    res.render('index', { title: 'Root Index', orderData: data });
  }).catch((err) => setImmediate(() => { throw err; }));
};
