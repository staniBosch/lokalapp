var express = require('express');
var router = express.Router();
var db = require('../models/database');



// GET /api/session
router.get('/', function (req, res, next) {

  /* TODO:
   * get all session-data from the database
   */

  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query("SELECT * FROM session", function (err, result, fields) {
        if (err) res.status(400).send(err.code);
        else res.status(200).send(result);
        res.end();
        con.release();
      });
  });
});

// GET /api/session/:id/:sensor
router.get('/id/:id/:sensor', function (req, res, next) {

  /* TODO:
   * get all session-data from the database
   */
  var sensor = req.params.sensor;
  var id = req.params.id;
  var sql = "";
  if (sensor == "lokalisierung" || sensor == "messwerte")
    sql = "SELECT * FROM session inner join " + sensor + " on session.id=" + sensor + ".session_id where session.id=" + id + " ORDER BY "+sensor+".timestamp";
  else
    sql = "SELECT * FROM session inner join " + sensor + " on session.id=" + sensor + ".session_id where session.id=" + id;
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

// GET /api/session/:id/:sensor/:timestamp
router.get('/id/:id/:sensor/:timestamp', function (req, res, next) {

  /* TODO:
   * get all session-data from the database after the time of the given timestamp
   */
  var timestamp = req.params.timestamp;
  var sensor = req.params.sensor;
  var id = req.params.id;
  var sql = "";
  if (sensor == "lokalisierung" || sensor == "messwerte")
    sql = "SELECT * FROM session inner join " + sensor + " on session.id=" + sensor + ".session_id where session.id=" + id + " ORDER BY "+sensor+".timestamp";
  else
    sql = "SELECT * FROM session inner join " + sensor + " on session.id=" + sensor + ".session_id where session.id=" + id + " AND "+ sensor + ".timestamp <"+ timestamp;
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

// POST /api/session/
router.post('/', function (req, res) {

  /* TODO:
   * create an session-value and add to the database
   */
  var sql = 'INSERT INTO session (id, timestamp, value) VALUES (NULL, CURRENT_TIMESTAMP, \'' + req.body.value + '\')';
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query(sql, function (err, result) {
        if (err) res.status(400).send(err.code);
        else {
          console.log("Data created and added");
          res.send({ "id": result.insertId });
        }
        res.end();
        con.release();
      });
  });
});

module.exports = router;