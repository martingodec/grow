const express = require("express");
const app = express();
const pool = require("./database");
const sql = require("./db_queries");

app.use(express.json());

app.listen(3000, () => {
  console.log("App en el puerto 3000");
});

app.post("/shopify", (req, res) => {
  //console.log(req.body);
  const order = req.body;
  /*
const order_id = order.name.slice(1,6);
const shipping_id = order.id;
const order_status = 'Preparando';
const order_date = order.created_at;
const order_update = order.updated_at;
const origen = 'Shopify';
const tracking_company = order.tracking_company;


console.log(order_id)
console.log(shipping_id)
console.log(order_status)
console.log(order_date)
console.log(order_update)
console.log(origen)
console.log(tracking_company);
*/
  pool.query(sql.saveOrder(order), function (err, rows, fields) {
    console.log(err);
    //console.log(rows);
    //console.log(fields);
    // Connection is automatically released when query resolves
  });

  for (let i = 0; i < order.line_items.length; i++) {
    console.log("------------------------------");
    console.log(order.line_items[i].sku);
    console.log("------------------------------");

    pool.query(sql.saveItem(order, i), function (err, rows, fields) {
      console.log(err);
      // console.log(rows);
      //console.log(fields);
      // Connection is automatically released when query resolves
    });
  }

  pool.query(sql.saveShipping(order), function (err, rows, fields) {
    console.log(err);
    // console.log(rows);
    //console.log(fields);
    // Connection is automatically released when query resolves
  });

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  pool.query(
    "SELECT item_sku FROM items WHERE order_id LIKE 15566",
    function (err, rows, fields) {
      console.log(err);
      // console.log(rows);
      //console.log(fields);
      // Connection is automatically released when query resolves
      res.json({ data: rows });
    }
  );
});


app.post('/treggoapi', (req,res) => {

    console.log(req.body);
    res.send('OK')
  
  })