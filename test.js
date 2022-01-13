const express = require("express");
const app = express();
const pool = require("./database");
const sql = require("./db_queries");
app.use(express.json());



app.listen(3100, () => {
  console.log("App en el puerto 3100");
});



//Get items by Order number
app.get("/shopify/order/:id", (req, res) => {
  const id = req.params.id;

  pool.query(
    `SELECT items.item_sku ,items.item_quantity, items_id, items.order_id, items.product_id FROM items 
  INNER JOIN shipping ON items.order_id = shipping.order_id 
  WHERE shipping.order_id LIKE '${id}'`,
    function (err, rows, fields) {
      if(err){console.log(err);}
      console.log(rows);
      //console.log(fields);
      // Connection is automatically released when query resolves
      res.json(rows);
      
    }
  );
  pool.releaseConnection(pool);
 
});







//Get OCA items by traking number
app.get("/shopify/oca/:id", (req, res) => {
  //MOMENTANEO
  const id = req.params.id.slice(0, -2);
  console.log(id);
  //MOMENTANEO
 
  pool.query(
    `SELECT items.item_sku ,items.item_quantity, items_id, items.order_id FROM items 
  INNER JOIN shipping ON items.order_id = shipping.order_id 
  WHERE shipping.tracking_number LIKE '${id}'`,
    function (err, rows, fields) {
      if(err){console.log(err);}
      console.log(rows);
      //console.log(fields);
      // Connection is automatically released when query resolves
      res.json(rows);
    }
  );

  pool.releaseConnection(pool);
});



//Get TREGGO items by traking number
app.get("/shopify/treggo/:id", (req, res) => {
  //MOMENTANEO
  const id = req.params.id;
  const idSuper = JSON.parse(id);
  const idFinal = idSuper._id;
  console.log(idFinal);
  //MOMENTANEO
  pool.query(
    `SELECT items.item_sku ,items.item_quantity, items_id, items.order_id FROM items 
  INNER JOIN treggo ON items.order_id = treggo.origin_id
  WHERE treggo._id LIKE '${idFinal}'`,
    function (err, rows, fields) {
      if(err){console.log(err);}
      console.log(rows);
      //console.log(fields);
      // Connection is automatically released when query resolves
      res.json(rows);
    }
  );
  pool.releaseConnection(pool);
});

//Update items SKU by order Number
app.put("/shopify/update", (req, res) => {
  const id = req.query.id;
  const sku = req.query.sku;
  console.log(id);

  console.log(sku) /
    pool.query(
      `UPDATE items SET items.item_sku ='${sku}' WHERE items.items_id = ${id}`,
      function (err, rows, fields) {
        
        if(err){console.log(err);}
        
        // console.log(rows);
        //console.log(fields);
        // Connection is automatically released when query resolves
        res.json({
          item_id: `${id}`,
          update: "OK",
          message: "Item update successful",
        });
      }
    );
    pool.releaseConnection(pool);
});

/*
SELECT items.item_sku ,items.item_quantity FROM items 
INNER JOIN shipping ON items.order_id = shipping.order_id
INNER JOIN treggo ON items.order_id = treggo.origin_id
WHERE treggo._id LIKE 'OT_61bb154c7463d8b431d8fe03';
*/


//PRUEBA TREGGO WEBHOOK

