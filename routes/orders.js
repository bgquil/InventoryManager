

// Render orders main page.
exports.listOrders = (req, res) => {
    const stmt = 'SELECT * FROM inventory.orders';
    
    req.db.query(stmt, (err, result) => {
        if (err)
            console.log(err);
        res.render('orders/orders', {title :'Orders', orderData : result});
    });
    
};

exports.createOrder = (req, res) => {
    res.render('orders/create_order', {title: 'Create Order'});
};

exports.applyOrder = (req, res) => {

};

exports.viewOrder = (req, res) => {
    const itemStmt = 'SELECT * FROM order_item INNER JOIN orders ON orders.OrderID = order_item.OrderID INNER JOIN items ON order_item.itemID = items.itemID  WHERE order_item.orderID = ?'
    const orderStmt = 'SELECT * FROM orders WHERE orderID = ?'
    
    let orderID = parseInt(req.params.id, 10);

    let itemsResult = {};
    let orderResult = {};

    if (orderID === parseInt(orderID, 10)){

        req.db.query(itemStmt, orderID, (err, itemsResult) => {
            if (err)
                throw(err);
            console.log(itemsResult);

            // res.render('orders/view_order', {title: 'Order View', itemData : itemsResult });
        });

        req.db.query(orderStmt, orderID, (err, orderResult) => {
            if (err)
                throw(err);
            console.log(orderResult);
        });

        res.render('orders/view_order', {title: 'Order View', orderData: orderResult, itemData : itemsResult });
    }
    else{
        console.log('%s is not a proper order ID.', orderID);
    }
    
};