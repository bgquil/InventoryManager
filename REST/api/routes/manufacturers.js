const express = require('express');
const router =  express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        manufacturerName: 'GET placeholder',
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        manufacturerName: 'POST Placeholder',
    });
});

module.exports = router;

