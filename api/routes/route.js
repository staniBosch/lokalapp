var express = require('express');
var router = express.Router();
var db = require('../models/database');
const kmlCreator = require("../service/KMLCreator.js");
var fs = require('fs');


// GET /api/route
router.get('/', function (req, res, next) {

  /* TODO:
   * get all route-data from the database
   */  
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query("SELECT * FROM route", function (err, result, fields) {
        if (err) res.status(400).send(err.code);
        else res.status(200).send(result);
        res.end();
        con.release();
      });
  });
});


// GET /api/route/:name/waypoint
router.get('/:name/waypoints', function (req, res, next) {

  /* TODO:
   * get all route-data from the database
   */
  var name = req.params.name;
  var sql = "SELECT * FROM route inner join waypoint on route.name=waypoint.route_name where route.name='"+name+"'";
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

// GET /api/route/:name/waypoint/kml
router.get('/:name/waypoints/kml', function (req, res, next) {

  /* TODO:
   * get all route-data from the database
   */
  var name = req.params.name;
  var sql = "SELECT * FROM route inner join waypoint on route.name=waypoint.route_name where route.name='"+name+"'";
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

// POST /api/route/
router.post('/', function (req, res) {

  /* TODO:
   * create an route-value and add to the database
   */
  var sql = "INSERT INTO route (namen, session_id) VALUES (NULL, '"
  + req.body.name +"')";
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