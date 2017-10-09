const express = require('express');
const mysql = require('mysql');
var bodyParser = require('express');
var path = require('path');
var routes = require('./routes');

// Routes
var entry = require('./routes/entry');

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




app.get('/', routes.index);
app.get('/entry', entry.show );






app.listen(3000, function(){
	console.log('Server started.\n listening on port 3000');
});
