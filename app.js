const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const manufacturers = require('./routes/manufacturers');
const items = require('./routes/items');
const orders = require('./routes/orders');

const app = express();

// View Engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Directories
app.use('/public', express.static(__dirname + '/public'));
app.use('/client', express.static(__dirname + '/client'));

// Routing

app.get('/', routes.index);

// Manufacturers
app.get('/manufacturers', manufacturers.manufacturersMain);
app.get('/manufacturers/list', manufacturers.getManufacturers);
app.post('/manufacturers/add', manufacturers.addManufacturer);
app.get('/manufacturers/edit/:id', manufacturers.renderEdit);
app.post('/manufacturers/edit/:id', manufacturers.editManufacturer);
app.get('/manufacturers/delete/:id', manufacturers.deleteManufacturer);
app.get('/manufacturers/:id', manufacturers.viewManufacturer);
// Items
app.get('/items', items.renderItemsMain);
app.post('/items/search', items.searchItems);
app.get('/items/add', items.add);
app.post('/items/add', items.addItem);
app.get('/items/edit/:id', items.editItem);
app.post('/items/edit/:id', items.applyEdit);
app.get('/items/delete/:id', items.renderDelete);
app.post('/items/delete/:id', items.applyDelete);
// Orders
app.get('/orders', orders.listRecentOrders);
app.get('/orders/search', orders.searchOrdersView);
app.post('/orders/search', orders.orderSearch);
app.get('/orders/create', orders.createOrder);
app.post('/orders/complete', orders.completeOrder);
app.get('/orders/view/:id', orders.viewOrder);
app.get('/orders/fulfill/:orderID', orders.fulfillOrder);

// Error Routing
// 404
app.use((req, res) => {
  res.type('text/html');
  res.status(404);
  res.render('404.ejs', { title: '404' });
});
// 500
app.use((req, res) => {
  res.type('text/html');
  res.status(500);
  res.render('500.ejs', { title: '500' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
