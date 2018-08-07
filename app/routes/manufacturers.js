// Import database connection
const db = require('../config/db');
const manufacturersDB = require('./db/manufacturersDB');
const itemsDB = require('./db/itemsDB');

const http = require('http');
const qs = require('querystring');

// Render the manufacturers main view.
exports.manufacturersMain = (req, res) => {
  manufacturersDB.getManufacturers().then((data) => {
    res.render('manufacturers/manufacturers', {
      title: 'manufacturers',
      manufacturerData: data,
    });
  });
};

// Add a new manufacturer to the database.
exports.addManufacturer2 = (req, res) => {
  const stmt = 'INSERT INTO inventory.manufacturers SET ?';
  const input = JSON.parse(JSON.stringify(req.body));
  const object = { manufacturerName: input.manufacturerName };

  db.query(stmt, object, (err) => {
    if (err) {
      throw err;
    }
  });
  res.redirect('/manufacturers');
};



exports.addManufacturer = (req, res) => {
  const input = JSON.parse(JSON.stringify(req.body));
  const manufacturer_form_data = qs.stringify({ 
    manufacturerName: input.manufacturerName,
  });

  const options = {
    host: 'localhost',
    port: 3001,
    path:'/manufacturers/add',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(manufacturer_form_data)
    }
  };

  const post_req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
  });
  post_req.write(manufacturer_form_data);
  post_req.end();

  res.redirect('/manufacturers');
};

// Remove a manufacturer from the database.
exports.deleteManufacturer = (req, res) => {
  const id = parseInt(req.params.id, 10);
  exports.deleteManufacturer(id);
  res.redirect('/manufacturers');
};

// Render the edit manufacturer view
exports.renderEdit = (req, res) => {
  manufacturersDB.getManufacturers(req.params.id).then((data) => {
    res.render('manufacturers/edit_manufacturer', {
      title: 'Edit Manufacturer',
      manufacturerData: data,
    });
  });
};

// Apply edit to manufacturer
exports.editManufacturer = (req, res) => {
  const stmt = 'UPDATE manufacturers SET ? WHERE manufacturerID = ?';
  const manufacturerEdits = JSON.parse(JSON.stringify(req.body));

  db.query(stmt, [manufacturerEdits, req.params.id], (err) => {
    if (err) {
      throw err;
    }
    else {
      res.redirect('/manufacturers');
    }
  });
};

// Manufacturer Overview with Items
exports.viewManufacturer = (req, res) => {
  manufacturersDB.getManufacturers().then((data) => {
    itemsDB.getItemsByManufacturer(req.params.id).then((itemList) => {
      res.render('manufacturers/view_manufacturer', {
        title: 'Manufacturer Overview',
        manufacturerData: data,
        itemData: itemList,
      });
    });
  });
};
