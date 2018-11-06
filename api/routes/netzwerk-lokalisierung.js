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
      con.query("SELECT * FROM netzwerk-lokalisierung", function (err, result, fields) {
        if (err) throw err;
        else res.status(200).send(result);
        res.end();
        con.release();
      });
  });
});

// POST /api/netzwerk-lokalisierung/
router.post('/', function (req, res) {

  /* TODO:
   * create an netzwerk-lokalisierung-value and add to the database
   */
  var sql = 'INSERT INTO netzwerk-lokalisierung (id, timestamp, x, y, z, session_id) VALUES (NULL, CURRENT_TIMESTAMP, \'' + req.body.x + '\', \'' + req.body.y + '\', \'' + req.body.z + '\', \'' + req.body.session_id + '\')';
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