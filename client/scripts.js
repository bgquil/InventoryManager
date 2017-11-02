


 

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
    
            console.log(item);
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
                buildItemsOrderTable(res.searchData)
            }
        });
    });

    const buildItemsOrderTable = (searchData) => {
        
        const tableB = $('.order_items-table-body');
        tableB.html('');
        let rowNum = 0;
        searchData.forEach( (item) => {
    
            tableB.append('\
            <tr>\
                <td>' + ++rowNum + '</td>\
                <td class="itemID">' + item.itemID + '</td>\
                <td>' + item.manufacturerName + '</td>\
                <td>' + item.name + '</td>\
                <td>' + item.model + '</td>\
                <td class="quantity-available">' + item.quantity + '</td>\
                <td>\
                    <input class="add-item-quantity" type="number" placeholder="1" >\
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
        let quantityAvailable = row.find('quantity-available').text();
        let quantity = row.find('add-item-quantity').val();
        if (quantity === ''){
            let quantity = 1;
        }
        else if(quantity < 1){
            throw NegativeQuantityError('Invalid Quantity');
        }
        
        addToOrderList({itemID: id, itemQuantity: quantity});
    });

    $('#completeOrderButton').click( () => {
        
    });






});






