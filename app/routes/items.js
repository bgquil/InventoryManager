// Import database connection
const db = require('../config/db');
const manufacturers = require('./manufacturers');
const itemsDB = require('./db/itemsDB');

const restService = require('../restService/restService');

const qs = require('querystring');


// Render the items main view
exports.renderItemsMain = (req, res) => {
  const quantityMin = 50;
  restService.getRequest('/items', (err, itemData)=> {
    if (err) {
      console.log(err);
    }
    res.render('items/items.ejs', { title: 'Manage Items', data: itemData });
  });
};

exports.searchItems = (req, res) => {
  const input = JSON.parse(JSON.stringify(req.body));
  // Parse search
  let searchType = '';
  const searchString = input.itemSearchString;
  switch (input.itemSearchType) {
    case 'Manufacturer':
      searchType = 'manufacturerName';
      break;
    case 'Name':
      searchType = 'name';
      break;
    case 'Model':
      searchType = 'model';
      break;
    default:
      searchType = 'name';
  }

  const search = qs.stringify({searchType, searchString});
  restService.postRequest('/items/search', search, (err, searchResult) => {
    if (err)
      console.log(err);
    searchResult = JSON.parse(searchResult);
    res.send({searchResult});
  });
};


// Render add item page
exports.add = (req, res) => {
  restService.getRequest('/manufacturers', (err, result) => {
    if (err)
      throw err;
    res.render('items/add_item', {
      title: 'Add Item',
      manufacturerData: result,
    });
  });
};


// Add an item to the items table
exports.addItem = (req, res) => {

  const input = JSON.parse(JSON.stringify(req.body));

  const newItem = qs.stringify({
    manufacturerID: input.manufacturerID, //examine
    name: input.name,
    model: input.model,
    weight: input.weight,
    price: input.price,
    quantity: input.quantity,
  });

  restService.postRequest('/items/add', newItem, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.redirect('/items');
  });

};

exports.removeItem = (req, res) => {
  res.redirect('/items');
};

exports.editItem = (req, res) => {
  // const stmt = 'SELECT * FROM items INNER JOIN\
  //     manufacturers ON items.manufacturerID = manufacturers.manufacturerID WHERE itemID = ?';
  // const stmt2 = 'SELECT * FROM inventory.manufacturers ORDER BY manufacturerName;'
  // manufacturers = null;
  // db.query(stmt2, (err, result) => {
  //     if (err) throw err;
  //         manufacturers = result;

  // });

  exports.getItem(req.params.id, (err, item) => {
    if (err) {
      throw err;
    }
    else {
      manufacturers.getManufacturerList((err, mList) => {
        if (err) {
          throw err;
        }
        else {
          res.render('items/edit_item', {
            title: 'Edit Item',
            itemData: item,
            manufacturerData: mList,
          });
        }
      });
    }
  });
};

exports.applyEdit = (req, res) => {
  const stmt = 'UPDATE items SET ? WHERE itemID=?';
  const input = JSON.parse(JSON.stringify(req.body));
  const item = {
    manufacturerID: input.manufacturerID,
    name: input.name,
    model: input.model,
    weight: input.weight,
    price: input.price,
    quantity: input.quantity,
  };

  db.query(stmt, [item, input.itemID], (err, result) => {
    if (err) {
      throw err;
    }
    res.redirect('/items');
  });
};

// Render delete confirmation view
exports.renderDelete = (req, res) => {
  const stmt = 'SELECT * FROM items INNER JOIN\
        manufacturers ON items.manufacturerID = manufacturers.manufacturerID WHERE itemID = ?';

  db.query(stmt, req.params.id, (err, result) => {
    if (err) throw err;
    res.render('items/delete_item', {
      title: 'Delete Item',
      itemData: result,
    });
  });

};

// Apply deletion to database
exports.applyDelete = (req, res) => {
  let stmt = '';

  console.log('apply deletion');

};


