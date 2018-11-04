var express = require('express');
var router = express.Router();
var db = require('../models/database');



// GET /api/schwerkraft
router.get('/', function(req, res, next) {
 
  /* TODO:
   * get all schwerkraft-data from the database
   */

  db.pool.getConnection(function(err, con) {
    if(err) return res.status(400).send("Databse Error");
    else
    con.query("SELECT * FROM proximity", function (err, result, fields) {
      if (err) throw err;
      else res.status(200).send(result);
      res.end();
      con.release();
    });  
  }); 
});

// POST /api/schwerkraft/
router.post('/', function(req, res) {

  /* TODO:
   * create an schwerkraft-value and add to the database
   */
  var sql = 'INSERT INTO schwerkraft (id, timestamp, value) VALUES (NULL, CURRENT_TIMESTAMP, \''+req.body.value+'\')';
  db.pool.getConnection(function(err, con) {
    if(err) return res.status(400).send("Databse Error");
    else
    con.query(sql, function (err, result) {
      if (err) throw err;
      else 
        console.log("Data created and added");
      res.end();
      con.release();
   });
  });  
});

module.exports = router;