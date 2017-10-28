
exports.listOrders = (req, res) => {
    //let stmt = 'SELECT * FROM inventory.orders';
    let result = {};
    res.render('orders', {title :'Order View', orderData : result})
};
