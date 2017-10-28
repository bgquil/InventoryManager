const mysql = require('mysql');

// MySQL server configuration
exports.dbConnection = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'abc123',
	port		:  3306,
	database	: 'Inventory'
});
