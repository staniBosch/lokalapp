var express = require('express');
var router = express.Router();
var db = require('../models/database');



// GET /api/schrittzaehler
router.get('/', function(req, res, next) {
 
  /* TODO:
   * get all schrittzaehler-data from the database
   */

  db.pool.getConnection(function(err, con) {
    if(err) return res.status(400).send("Databse Error");
    else
    con.query("SELECT * FROM schrittzaehler", function (err, result, fields) {
      if (err) throw err;
      else res.status(200).send(result);
      res.end();
      con.release();
    });  
  }); 
});

// POST /api/schrittzaehler/
router.post('/', function(req, res) {

  /* TODO:
   * create an schrittzaehler-value and add to the database
   */
  var sql = 'INSERT INTO schrittzaehler (id, timestamp, value, session_id) VALUES (NULL, \'' + req.body.timestamp + '\', \'' + req.body.value + '\', \'' + req.body.session_id + '\')';
    db.pool.getConnection(function (err, con) {
      if (err) return res.status(400).send("Databse Error");
      else
        con.query(sql, function (err, result) {
          if (err) throw err;
          else {
            console.log("Data created and added");
            res.send(req.body);
          }
          res.end();
          con.release();
        });
    });  
});

module.exports = router;