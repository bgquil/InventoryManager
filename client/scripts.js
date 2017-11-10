


 

$(() => {

    // Manufacturers

    $('#manufacturer_form_add').on('submit', (event) => {
        event.preventDefault();

        let inputName = $('#manufacturerName');

        $.ajax({
            url: '/manufacturers/add',
            method: 'POST',
            contentType: 'application/JSON' ,
            data: JSON.stringify({manufacturerName : inputName.val()}),
            success: () => {
                inputName.val('');
                fetchManufacturers();

            }

        });
    });

    const fetchManufacturers = () => {
        $.ajax({
            url: '/manufacturers/list',
            contentType: 'application/JSON',
            success: (res) => {
                let tableB = $('#manufacturers_table_body');
                tableB.html('');
       
                res.manufacturerData.forEach( (manufacturer) => {
                    tableB.append('\
                    <tr>\
                        <td class="id">' + manufacturer.manufacturerID + '</td>\
                        <td class="id">' + manufacturer.manufacturerName + '</td>\
                        <td>\
                            <a class="a-inside edit" href="/manufacturers/edit/' + manufacturer.manufacturerID + '">Edit</a>\
                            <a class="a-inside delete" href="/manufacturers/delete/' + manufacturer.manufacturerID + '">Delete</a>\
                        </td>\
                    </tr>\
                    ');
                });
            }
        });
    };


    // Items

    $('#items_search_form').on('submit', (event) => {
        event.preventDefault();
        let searchString = $('#itemSearchString');
        let searchType = $('#itemSearchType');
        $.ajax({
            url: '/items/search',
            method:'POST',
            contentType: 'application/JSON',
            data: JSON.stringify({itemSearchType : searchType.val(), itemSearchString: searchString.val()}),
            success: (res) => {
                buildItemsTable(res.searchData)
            }
        });
    });

    const buildItemsTable = (searchData) => {
        const tableB = $('#items_table_body');
        tableB.html('');
        let rowNum = 0;
        searchData.forEach( (item) => {

            tableB.append('\
            <tr>\
                <td class="id">' + ++rowNum + '</td>\
                <td class="id">' + item.itemID + '</td>\
                <td class="id">' + item.manufacturerName + '</td>\
                <td class="id">' + item.name + '</td>\
                <td class="id">' + item.model + '</td>\
                <td class="id">' + item.quantity + '</td>\
                <td>\
                    <a class="a-inside edit" href="/item/edit/' + item.itemID + '">Edit</a>\
                    <a class="a-inside delete" href="/item/delete/' + item.itemID + '">Delete</a>\
                </td>\
            </tr>\
            ');
        });
    };

    //Orders

    let orderList = [];

    $('#order-complete-button').click(function() { 
        if (orderList.length < 1){
            //error message
        }
        else{

            $.ajax({
                url:'/orders/complete',
                method: 'POST',
                contentType: 'application/JSON',
                data: JSON.stringify(orderList),
                success: () => {
                    console.log('in ajax');
                    window.location.replace('/orders');
                }
            });

        }

    });

    let addToOrderList = (item) => {
        // findIndex may not work for older browsers.
        let index = orderList.findIndex(i => i.itemID === item.itemID);
        if ( index < 0 )
            orderList.push(item);
        
        else
            orderList[index].quantity += item.quantity;
        
        buildItemOrderList(orderList);
    };

    let removeFromOrderList = (rowNum) => {
        if (rowNum > -1)
            orderList.splice(rowNum, 1);
        buildItemOrderList(orderList);
    };

    $('.order_items-list').on('click', '.remove-item-button', function() {
        let rowNum = $(this).closest('tr').find('.rowNum').text();
        console.log('clicked');
        removeFromOrderList(parseInt(rowNum)-1); 
    });

    const buildItemOrderList = (orderList) => {
        const tableB = $('.order_items-list');
        tableB.html('');
        let rowNum = 0;
    
        orderList.forEach( (item) => {
            tableB.append('\
            <tr>\
                <td class="rowNum">' + ++rowNum + '</td>\
                <td class="itemID">' + item.itemID + '</td>\
                <td>' + item.manufacturerName + '</td>\
                <td>' + item.name + '</td>\
                <td>' + item.model + '</td>\
                <td class="quantity-requested">' + item.quantity + '</td>\
                <td>\
                    <button class="btn btn-primary remove-item-button">Remove Item</button>\
                </td>\
            </tr>\
            ');
        });

    };



    $('#items_search_order_form').on('submit', (event) => {
        event.preventDefault();
        let searchString = $('#itemSearchString');
        let searchType = $('#itemSearchType');
        $.ajax({
            url: '/items/search',
            method:'POST',
            contentType: 'application/JSON',
            data: JSON.stringify({itemSearchType : searchType.val(), itemSearchString: searchString.val()}),
            success: (res) => {
                buildItemsOrderSearchTable(res.searchData)
            }
        });
    });

    const buildItemsOrderSearchTable = (searchData) => {
        
        const tableB = $('.order_items-table-body');
        tableB.html('');
        let rowNum = 0;
        searchData.forEach( (item) => {
            
            tableB.append('\
            <tr>\
                <td>' + ++rowNum + '</td>\
                <td class="itemID">' + item.itemID + '</td>\
                <td class="itemManufacturer">' + item.manufacturerName + '</td>\
                <td class="itemName">' + item.name + '</td>\
                <td class="itemModel">' + item.model + '</td>\
                <td class="quantity-available">' + item.quantity + '</td>\
                <td>\
                    <input class="add-item-quantity" type="text" placeholder="1" >\
                    <button class="btn btn-primary add-item-button">Add Item</button>\
                </td>\
            </tr>\
            ');
        });
    };



    // function() {} required here over () => {}
    $('.order_items-table-body').on('click', '.add-item-button', function() {
        let row = $(this).closest('tr');
        let id = row.find('.itemID').text();
        let manuf = row.find('.itemManufacturer').text();
        let name = row.find('.itemName').text();
        let model = row.find('.itemModel').text();
        let quantityAvailable = row.find('quantity-available').text();
        let quantity = parseInt(row.find('.add-item-quantity').val());

        if (typeof(quantity) == 'undefined'){
            quantity = 1;
        }
        else if(quantity < 1){
            throw NegativeQuantityError('Invalid Quantity');
        }
        quantity = 1;
        addToOrderList({itemID: id,
            manufacturerName: manuf,
            name: name,
            model: model,
            quantity: quantity
        });
    });

    $('#completeOrderButton').click( () => {
        
    });






});






