var express = require('express');
var router = express.Router();
var db = require('../models/database');



// GET /api/licht
router.get('/', function(req, res, next) {
 
  /* TODO:
   * get all licht-data from the database
   */

  db.pool.getConnection(function(err, con) {
    if(err) return res.status(400).send("Databse Error");
    else
    con.query("SELECT * FROM licht", function (err, result, fields) {
      if (err) throw err;
      else res.status(200).send(result);
      res.end();
      con.release();
    });  
  }); 
});

// POST /api/licht/
router.post('/', function(req, res) {

  /* TODO:
   * create an licht-value and add to the database
   */
  var sql = 'INSERT INTO licht (id, timestamp, lux) VALUES (NULL, CURRENT_TIMESTAMP, \''+req.body.lux+'\')';
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