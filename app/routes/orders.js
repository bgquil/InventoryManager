// Import database connection
const db = require('../config/db');
const ordersDB = require('./db/ordersDB');

// Render orders main page.
exports.listRecentOrders = (req, res) => {
  ordersDB.getRecentOrders().then((data) => {
    res.render('orders/orders', { pageTitle: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};

// Render orders main page.
exports.renderOpenOrders = (req, res) => {
  ordersDB.getOpenOrders().then((data) => {
    res.render('orders/view_open_order', { pageTitle: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};

// Render orders search page.
exports.searchOrdersView = (req, res) => {
  ordersDB.getRecentOrders().then((data) => {
    res.render('orders/search_order', { pageTitle: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};

// Render create order page
exports.createOrder = (req, res) => {
  res.render('orders/create_order', { pageTitle: 'Create Order' });
};

exports.listOrders = (req, res) => {
  ordersDB.getRecentOrders().then((data) => {
    res.render('orders/orders', { pageTitle: 'Orders', orderData: data });
  }).catch(err => setImmediate(() => { throw err; }));
};


exports.completeOrder = (req, res) => {
  const orderList = JSON.parse(JSON.stringify(req.body));
  const itemStmt = 'INSERT INTO order_item (orderID, itemID, quantityOrdered) VALUES (?, ?, ?);'

  ordersDB.getNextOrderID(orderList.length).then((data) => {
    const orderID = data.insertId;
    orderList.forEach((orderItem) => {
      const values = [orderID, orderItem.itemID, orderItem.quantity];
      db.query(itemStmt, values, (err) => {
        if (err) {
          throw err;
        }
      });
    });
    res.redirect('/orders');
  }).catch(err => setImmediate(() => {throw err}));

};

exports.completeOrder2 = (req, res) => {
  const orderList = JSON.parse(JSON.stringify(req.body));
  const itemStmt = 'INSERT INTO order_item (orderID, itemID, quantityOrdered) VALUES (?, ?, ?);'

  ordersDB.getNextOrderID(orderList.length).then((data) => {
    const orderID = data[0][0].orderID;
    orderList.forEach((orderItem) => {
      const values = [orderID, orderItem.itemID, orderItem.quantity];
      db.query(itemStmt, values, (err) => {
        if (err) {
          throw err;
        }
      });
    });
    res.redirect('/orders');
  });

};

exports.viewOrder = (req, res) => {
  const orderID = parseInt(req.params.id, 10);
  ordersDB.getOrderInvoice(orderID).then((invoiceData) => {
    // invoiceData is [0] = order information, [1] = item information in orders
    res.render('orders/view_order', { pageTitle: 'Order Invoice', orderData: invoiceData[0], itemData: invoiceData[1] });
  });
};

// Set an order's status as fulfilled
exports.fulfillOrder = (req, res) => {
  const orderID = req.params.orderID;
  ordersDB.fulfillOrder(orderID).then(() => {

    res.redirect('/orders/view/' + orderID);
  }).catch(err => setImmediate(() => { res.redirect('/orders/view/' + orderID); }));
};

// Used for AJAX searching by date.
exports.orderSearch = (req, res) => {
  const input = JSON.parse(JSON.stringify(req.body));
  const startDate = input.startDate;
  const endDate = input.endDate;
  const status = input.status;
  if (input.status === '*') {
    ordersDB.getOrdersDate(startDate, endDate).then((data) => {
      res.send({ orderData: data });
    });
  } else {
    ordersDB.getOrdersDateStatus(startDate, endDate, status).then((data) => {
      res.send({ orderData: data });
    });
  }
};
