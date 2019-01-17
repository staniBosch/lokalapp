var express = require('express');
var router = express.Router();
var db = require('../models/database');
const kmlCreator = require("../service/GEOCreator.js");
var fs = require('fs');


// GET /api/messwerteroute
router.get('/', function (req, res, next) {

  /* TODO:
   * get all messwerteroute-data from the database
   */  
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query("SELECT * FROM messwerteroute", function (err, result, fields) {
        if (err) res.status(400).send(err.code);
        else res.status(200).send(result);
        res.end();
        con.release();
      });
  });
});


// GET /api/messwerteroute/:session_id/:name/
router.get('/:session_id/:name', function (req, res, next) {

  /* TODO:
   * get all route-data from the database
   */
  var session_id = req.params.session_id;
   var name = req.params.name;

  var sql = "Select * FROM messwerteroute_view where name='"+name+"' AND session_id='"+session_id+"' ORDER BY timestamp";
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

// GET /api/messwerteroute/:name/kml
router.get('/:session_id/:name/kml', function (req, res, next) {

  /* TODO:
   * get all route-data from the database
   */
  var session_id = req.params.session_id;
  var name = req.params.name;
  var sql = "Select * FROM messwerteroute_view where name='"+name+"' AND session_id='"+session_id+"'";
  db.pool.getConnection(function (err, con) {
    var fileName = "/../../public/tmp.kml";
      var savedFilePath = __dirname + fileName;
    if (err) return res.status(400).send("Databse Error");
    else
      con.query(sql, function (err, result, fields) {
        if (err) res.status(400).send(err.code);
        else{
          var fileContents = kmlCreator.createKML(result);
          fs.writeFile(savedFilePath, fileContents, function (err) {
              if (err) console.log(err);
              res.status(200).download(savedFilePath, "messwerteroute.kml");
          });              
        }
        res.end();
        con.release();
      });
  });
});

// POST /api/messwerteroute/
router.post('/', function (req, res) {

  /* TODO:
   * create an messwerteroute-value and add to the database
   */
  var sql = "INSERT INTO messwerteroute (name, route_template, session_id) VALUES ('"  
  + req.body.name +"','"
  + req.body.route_template +"','"
  + req.body.session_id +"')";
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