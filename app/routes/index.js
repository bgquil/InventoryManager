// Import database connection
const ordersDB = require('./db/ordersDB');
const restService = require('../restService/restService');

// Get Index
exports.index = (req, res) => {
  const openPath = '/orders/open'
  restService.getRequest(openPath, (err, result) => {
    res.render('index', { title: 'Root Index', orderData: result });
  });
};
