// Import database connection
const db = require('../config/db');
const manufacturersDB = require('./db/manufacturersDB');
const itemsDB = require('./db/itemsDB');

const restService = require('../restService/restService');

const qs = require('querystring');


// Render the manufacturers main view.
exports.manufacturersMain = (req, res) => {
  const apiPath = '/manufacturers'
  restService.getRequest(apiPath, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.render('manufacturers/manufacturers', {
      title: 'manufacturers',
      manufacturerData: result,
    });
  });
};

exports.addManufacturer = (req, res) => {
  const input = JSON.parse(JSON.stringify(req.body));
  const manufacturer_form_data = qs.stringify({ 
    manufacturerName: input.manufacturerName,
  });
  const apiPath = '/manufacturers/add'; 
  restService.postRequest(apiPath, manufacturer_form_data);
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
  const manufacturerID = req.params.id;
  const apiPath = '/manufacturers/'+ manufacturerID;
  restService.getRequest(apiPath, (err, data) => {
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
  const manufacturerID = req.params.id;
  const manufacturerPath = '/manufacturers/' + manufacturerID;
  const manufacturerItemsPath = '/manufacturers/' + manufacturerID + '/items';
  console.log(manufacturerItemsPath);
  restService.getRequest(manufacturerPath, (err, manufacturerData) => {
    restService.getRequest(manufacturerItemsPath, (err, itemData) => {
      console.log(itemData);
      res.render('manufacturers/view_manufacturer', {
        title: 'Manufacturer Overview',
        manufacturerData,
        itemData
      });

    });
  });
};