var express = require('express');
var router = express.Router();
var db = require('../models/database');



// GET /api/luftfeuchtigkeit
router.get('/', function(req, res, next) {
 
  /* TODO:
   * get all luftfeuchtigkeit-data from the database
   */

  db.pool.getConnection(function(err, con) {
    if(err) return res.status(400).send("Databse Error");
    else
    con.query("SELECT * FROM luftfeuchtigkeit", function (err, result, fields) {
      if (err) throw err;
      else res.status(200).send(result);
      res.end();
      con.release();
    });  
  }); 
});

// POST /api/luftfeuchtigkeit/
router.post('/', function(req, res) {

  /* TODO:
   * create an luftfeuchtigkeit-value and add to the database
   */
  var sql = 'INSERT INTO luftfeuchtigkeit (id, timestamp, humidity) VALUES (NULL, CURRENT_TIMESTAMP, \''+req.body.humidity+'\')';
  db.pool.getConnection(function(err, con) {
    if(err) return res.status(400).send("Databse Error");
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