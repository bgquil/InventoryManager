const express = require('express');
const mysql = require('mysql');
var bodyParser = require('express');
var path = require('path');
var routes = require('./routes');

// Routes
const entry = require('./routes/entry');
const manufacturers = require('./routes/manufacturers');
const items = require('./routes/items');

var app = express();

const db = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'abc123',
	port		:  3306,
	database	: 'Inventory'
});

// View Engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')))


db.connect((err) => {
	if (err){
		throw err;
	}
	console.log('MySQL connection established.');
});

// Make db accessible to routing.
app.use((req, res, next) => {
	req.db = db;
	next();
});

// Routing
app.get('/', routes.index);
app.get('/entry', entry.show );
// Manufacturers
app.get('/manufacturers', manufacturers.listManufacturers);
app.post('/manufacturers/add', manufacturers.addManufacturer);
app.get('/manufacturers/edit/:id', manufacturers.editManufacturer);
app.get('/manufacturers/delete/:id', manufacturers.deleteManufacturer);
// Items
app.get('/items', items.listItems);
app.get('/items/add', items.add);
app.get('/items/search', items.searchRedirect);
app.post('/items/search', items.searchItems);
app.get('/items/edit/:id', items.editItem);
app.post('/items/edit/:id',items.applyEdit);
// app.post('/items', items.searchItems);

/* 
Error Routing
*/
app.use((req, res) =>{
 res.type('text/html');
 res.status(404);
 res.render('404.ejs', {title: '404'});
});

app.use((req, res) =>{
	res.type('text/html');
	res.status(500);
	res.render('500.ejs', {title: '500'});
   });


app.listen(3000, function(){
	console.log('Server started.\n listening on port 3000');
});