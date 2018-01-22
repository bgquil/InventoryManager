
const express = require('express');
const router = express.Router();

manufacturersController = require('../controllers/manufacturersController');

router.get('/', manufacturersController.manufacturers_get_all);

router.get('/:manufacturerID', manufacturersController.manufacturers_get_single);

//router.post('/', manufacturersController.manufacturers_create_manufacturer);

module.exports = router;