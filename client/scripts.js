$(() => {
  // Manufacturers

  const fetchManufacturers = () => {
    $.ajax({
      url: '/manufacturers/list',
      contentType: 'application/JSON',
      success: (res) => {
        const tableB = $('#manufacturers_table_body');
        tableB.html('');

        res.manufacturerData.forEach((manufacturer) => {
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
      },
    });
  };

  $('#manufacturer_form_add').on('submit', (event) => {
    event.preventDefault();
    const inputName = $('#manufacturerName');
    $.ajax({
      url: '/manufacturers/add',
      method: 'POST',
      contentType: 'application/JSON',
      data: JSON.stringify({ manufacturerName: inputName.val() }),
      success: () => {
        inputName.val('');
        fetchManufacturers();
      },
    });
  });

  // Items

  const buildItemsTable = (searchData) => {
    const tableB = $('#items_table_body');
    tableB.html('');
    let rowNum = 0;
    searchData.forEach((item) => {
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

  $('#items_search_form').on('submit', (event) => {
    event.preventDefault();
    const searchString = $('#itemSearchString');
    const searchType = $('#itemSearchType');
    $.ajax({
      url: '/items/search',
      method: 'POST',
      contentType: 'application/JSON',
      data: JSON.stringify({ 
        itemSearchType: searchType.val(),
        itemSearchString: searchString.val(),
      }),
      success: (res) => {
        buildItemsTable(res.searchData);
      },
    });
  });

  // Orders

  const buildItemOrderList = (orderList) => {
    const tableB = $('.order_items-list');
    tableB.html('');
    let rowNum = 0;

    orderList.forEach((item) => {
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

  const orderList = [];

  $('#order-complete-button').click(() => {
    if (orderList.length < 1) {
      //error message
    }
    else {
      $.ajax({
        url: '/orders/complete',
        method: 'POST',
        contentType: 'application/JSON',
        data: JSON.stringify(orderList),
        success: () => {
          window.location.replace('/orders');
        },
      });
    }
  });

  const addToOrderList = (item) => {
    // findIndex may not work for older browsers.
    const index = orderList.findIndex(i => i.itemID === item.itemID);
    if (index < 0) {
      orderList.push(item);
    }
    else {
      orderList[index].quantity += item.quantity;
    }
    buildItemOrderList(orderList);
  };

  const removeFromOrderList = (rowNum) => {
    if (rowNum > -1) {
      orderList.splice(rowNum, 1);
    }
    buildItemOrderList(orderList);
  };

  $('.order_items-list').on('click', '.remove-item-button', function () {
    let rowNum = $(this).closest('tr').find('.rowNum').text();
    console.log('clicked');
    removeFromOrderList(parseInt(rowNum) - 1);
  });

  $('#items_search_order_form').on('submit', (event) => {
    event.preventDefault();
    const searchString = $('#itemSearchString');
    const searchType = $('#itemSearchType');
    $.ajax({
      url: '/items/search',
      method: 'POST',
      contentType: 'application/JSON',
      data: JSON.stringify({
        itemSearchType: searchType.val(),
        itemSearchString: searchString.val(),
      }),
      success: (res) => {
        buildItemsOrderSearchTable(res.searchData);
      },
    });
  });

  const buildItemsOrderSearchTable = (searchData) => {

    const tableB = $('.order_items-table-body');
    tableB.html('');
    let rowNum = 0;
    searchData.forEach((item) => {

      tableB.append('\
            <tr>\
                <td>' + ++rowNum + '</td>\
                <td class="itemID">' + item.itemID + '</td>\
                <td class="itemManufacturer">' + item.manufacturerName + '</td>\
                <td class="itemName">' + item.name + '</td>\
                <td class="itemModel">' + item.model + '</td>\
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
  $('.order_items-table-body').on('click', '.add-item-button', function () {
    const row = $(this).closest('tr');
    const id = row.find('.itemID').text();
    const manuf = row.find('.itemManufacturer').text();
    const name = row.find('.itemName').text();
    const model = row.find('.itemModel').text();
    const quantityAvailable = parseInt(row.find('.quantity-available').text());
    const quantity = parseInt(row.find('.add-item-quantity').val());
    // using property shorthand
    if ((quantity > 0) && (quantity <= quantityAvailable)) {
      addToOrderList({
        itemID: id,
        manufacturerName: manuf,
        name,
        model,
        quantity,
      });
    }
    else {
      throw NegativeQuantityError('Invalid Quantity');
    }
  });

  $('#completeOrderButton').click(() => {

  });



  const buildOrderTable = (searchData) => {
    const tableB = $('.order_table_body');
    tableB.html('');
    let rowNum = 0;
    searchData.forEach((order) => {

      tableB.append('\
            <tr>\
                <td>' + ++rowNum + '</td>\
                <td class="orderID">' + order.orderID + '</td>\
                <td class="totalQuantity">' + order.totalQuantity + '</td>\
                <td class="orderTime">' + order.orderTime + '</td>\
                <td class="orderFulfilled">' + (order.orderFulfilled === 1 ? "Fulfilled" : "Open") + '</td>\
                <td>\
                    <a href="/orders/view/'+ order.orderID +'"class="btn btn-primary view-order-button">View Order</a>\
                </td>\
            </tr>\
            ');
    });
  };


  // Order Search
  $('#order_search_form').on('submit', (event) => {
    event.preventDefault();
    console.log('abc');
    const start = $('#orderStartDate').val();
    const end = $('#orderEndDate').val();
    const status = $('#fulfillmentStatusSelection').val();
    $.ajax({
      url: '/orders/search',
      method: 'POST',
      contentType: 'application/JSON',
      data: JSON.stringify({
        startDate: start,
        endDate: end,
        status,
      }),
      success: (res) => {
        buildOrderTable(res.orderData);
      },
    });
  });
});
