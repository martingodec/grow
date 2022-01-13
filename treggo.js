var axios = require('axios');
const pool = require('./database')
const sql = require ('./db_queries');

var config = {
  method: 'get',
  url: '******',
  headers: { 
      'authentication': '******'
     
  }
};


axios(config)
.then(function (response) {
  console.log(response.data.length);

let startDate = new Date(Date.now()-86400000).toISOString();
let endDate= new Date(Date.now()).toISOString();
const result = response.data.filter(function(obj){
 return obj.date >= startDate && obj.date <= endDate

})
console.log(result.length)

for(let i = 0; i < result.length; i++){

  pool.query(sql.saveTreggo(result, i), function(err, rows, fields) {
    console.log(err);
    
}) 
}
})




.catch(function (error) {
  console.log(error);
});



