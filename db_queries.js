exports.saveOrder = (order) => {
    return `INSERT INTO orders
    (order_id, shipping_id,order_status,order_date,order_update,origen, tracking_company)
    VALUES(
    '${order.name.slice(1, 6)}',
    '${order.id}',
    'Preparando',
    '${order.created_at}',
    '${order.updated_at}',
    'Shopify',
    '${order.tracking_company}'

 )`;
};

exports.saveItem = (order, i) => {
    return `INSERT INTO items  (order_id, item_sku, item_quantity, product_id)
VALUES(
    
    '${order.name.slice(1, 6)}',
    '${order.line_items[i].sku}',
     ${order.line_items[i].quantity},
    '${order.line_items[i].product_id}'
)`;
};

exports.saveShipping = (order) => {
    return `INSERT INTO shipping  (shipping_id, order_id, tracking_number,tracking_company)
    VALUES(
        
         ${order.id},
        '${order.name.slice(1, 6)}',
        '${order.tracking_number}',
        '${order.tracking_company}'

    )`;
};

exports.saveTreggo = (result, i) => {
    return `INSERT INTO treggo ( _id, treggo_id, origin_id,origin_type, status, date )
    VALUES(
            
            '${result[i]._id}',
            '${result[i].id}',
            '${result[i].origin.id}',
            '${result[i].origin.type}',
            '${result[i].status}',
            '${new Date(result[i].date)
            .toLocaleString("sv", { timeZoneName: "short" })
            .slice(0, -5)}'
           )

           ON DUPLICATE KEY UPDATE status='${result[i].status}'
        `;
};
