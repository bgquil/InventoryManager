const mysql = require('mysql');

const connection = mysql.createConnection({
		host		: 'localhost',
		user		: 'root',
		password	: 'abc123',
		port		:  3306,
		database	: 'Inventory'
	});

connection.connect( (err) => {
	if (err) throw err;
	console.log('Connected to MySQL Database.')
});

module.exports = connection;