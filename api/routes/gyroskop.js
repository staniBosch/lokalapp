var express = require('express');
var router = express.Router();
var db = require('../models/database');



// GET /api/gyroskop
router.get('/', function(req, res, next) {
 
  /* TODO:
   * get all gyroskop-data from the database
   */

  db.pool.getConnection(function(err, con) {
    if(err) return res.status(400).send("Databse Error");
    else
    con.query("SELECT * FROM gyroskop", function (err, result, fields) {
      if (err) throw err;
      else res.status(200).send(result);
      res.end();
      con.release();
    });  
  }); 
});

// POST /api/gyroskop/
router.post('/', function(req, res) {

  /* TODO:
   * create an gyroskop-value and add to the database
   */
  if(req.body.session_id != "-1" && req.body.session_id != null){
    var sql = 'INSERT INTO gyroskop (id, timestamp, x, y, z, session_id) VALUES (NULL, CURRENT_TIMESTAMP, \''+req.body.x+'\', \''+req.body.y+'\', \''+req.body.z+'\', \''+req.body.session_id+'\')';
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
  } else{
    res.send("No Session found");
    res.end();
  }  
  
});

module.exports = router;