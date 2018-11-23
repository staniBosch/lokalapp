var express = require('express');
var router = express.Router();
var db = require('../models/database');



// GET /api/netzwerk-lokalisierung
router.get('/', function (req, res, next) {

  /* TODO:
   * get all netzwerk-lokalisierung-data from the database
   */

  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query("SELECT * FROM netzwerklokalisierung", function (err, result, fields) {
        if (err) throw err;
        else res.status(200).send(result);
        res.end();
        con.release();
      });
  });
});

// POST /api/netzwerklokalisierung/
router.post('/', function (req, res) {

  /* TODO:
   * create an netzwerklokalisierung-value and add to the database
   */
  var sql = 'INSERT INTO netzwerklokalisierung (id, timestamp, Latitude , Longitude, Hoehe, session_id) VALUES (NULL, CURRENT_TIMESTAMP, \'' + req.body.Latitude  + '\', \'' + req.body.Longitude + '\', \'' + req.body.Hoehe + '\', \'' + req.body.session_id + '\')';
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query(sql, function (err, result) {
        if (err) return res.status(400).send(err);
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