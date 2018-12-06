var express = require('express');
var router = express.Router();
var db = require('../models/database');



// GET /api/waypoint
router.get('/', function (req, res, next) {

  /* TODO:
   * get all waypoint-data from the database
   */
  console.log("Data created and added");
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query("SELECT * FROM waypoint", function (err, result, fields) {
        if (err) res.status(400).send(err.code);
        else res.status(200).send(result);
        res.end();
        con.release();
      });
  });
});

// GET /api/waypoint/:id/:sensor
router.get('/id/:id/:sensor', function (req, res, next) {

  /* TODO:
   * get all waypoint-data from the database
   */
  var sensor = req.params.sensor;
  var id = req.params.id;
  var sql = "SELECT * FROM waypoint inner join " + sensor + " on session.id=" + sensor + ".session_id where session.id=" + id;
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query(sql, function (err, result, fields) {
        if (err) res.status(400).send(err.code);
        else res.status(200).send(result);
        res.end();
        con.release();
      });
  });
});

// POST /api/waypoint/
router.post('/', function (req, res) {

  /* TODO:
   * create an waypoint-value and add to the database
   */
  var sql = "INSERT INTO waypoint (id, timestamp, latitude, longitude, altitude, indoor, session_id) VALUES (NULL, '"+req.body.timestamp+"', '" + req.body.latitude + "', '" + req.body.longitude + "', '" + req.body.altitude + "', '" + req.body.indoor + "', '" + req.body.session_id + "')";
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query(sql, function (err, result) {
        if (err) res.status(400).send(err.code);
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