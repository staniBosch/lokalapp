var express = require('express');
var router = express.Router();
var db = require('../models/database');


// GET /api/gps/
router.get('/', function(req, res, next) {
 
  /* TODO:
   * get all gps-data from the database
   */

  db.pool.getConnection(function(err, con) {
    if(err) return res.status(400).send("Database Error");
    else
    con.query("SELECT * FROM gps", function (err, result, fields) {
      if (err) throw err;
      else res.status(200).send(result);
      res.end();
      con.release();
    });  
  }); 
});

// POST /api/gps/
router.post('/', function(req, res) {

  /* TODO:
   * create an gps-sendor-data and add it to the database
   */
  
   if(req.body instanceof Array)
  var sql = 'INSERT INTO gps (id, timestamp, Latitude, Longitude, Hoehe) VALUES (NULL, CURRENT_TIMESTAMP, \''+req.body[0].Latitude+'\', \''+req.body[0].Longitude+'\', \''+req.body[0].Hoehe+'\')';
  else 
  var sql = 'INSERT INTO gps (id, timestamp, Latitude, Longitude, Hoehe) VALUES (NULL, CURRENT_TIMESTAMP, \''+req.body.Latitude+'\', \''+req.body.Longitude+'\', \''+req.body.Hoehe+'\')';
  
  db.pool.getConnection(function(err, con) {
    if(err) return res.status(400).send("Database Error");
    else
    con.query(sql, function (err, result) {
      if (err) throw err;
      else{
         console.log("Data created and added");
         res.send(req.body);
      }
      res.end();
      con.release();
    });
  });  
});

module.exports = router;