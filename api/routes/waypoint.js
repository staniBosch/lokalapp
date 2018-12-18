var express = require('express');
var router = express.Router();
var db = require('../models/database');
const kmlCreator = require("../service/KMLCreator.js");
var fs = require('fs');


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


// POST /api/waypoint/
router.post('/', function (req, res) {

  /* TODO:
   * create an waypoint-value and add to the database
   */
  if (req.body instanceof Array) {
    var sqlarr = [];
    for (var i = 0; i < req.body.length; i++) {  
      sqlarr.push("INSERT INTO waypoint (id, timestamp, latitude, longitude, altitude, indoor, route_name) VALUES (NULL, '"
      + req.body[i].timestamp + "', '"
      + req.body[i].latitude + "', '"
      + req.body[i].longitude + "', '"
      + req.body[i].altitude + "', '"
      + req.body[i].indoor + "', '"
      + req.body[i].route_name + "')");
    }
    for(var i = 0; i<sqlarr.length; i++){      
      db.pool.getConnection((err, con) => {
        var sql = sqlarr[i];
        console.log("was stimmt hier nicht "+sqlarr);
        if (err) return res.status(400).send("Databse Error");
        else
          con.query(sql, function (err, result) {
            if (err) res.status(400).send(err.code);
            else {
              console.log(sql); 
              res.send(req.body);      
            }            
            con.release();
          });
      }); 
    }       
    res.end();
  }

  else {
    var sql = "INSERT INTO waypoint (id, timestamp, latitude, longitude, altitude, indoor, route_name) VALUES (NULL, '"
      + req.body.timestamp + "', '"
      + req.body.latitude + "', '"
      + req.body.longitude + "', '"
      + req.body.altitude + "', '"
      + req.body.indoor + "', '"
      + req.body.route_name + "')";
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
  }




});

router.get('/kml', function (req, res, next) {

  db.pool.getConnection(function (err, con) {
    var fileName = "/../../public/tmp.kml";
    var savedFilePath = __dirname + fileName;
    if (err) return res.status(400).send("Databse Error");
    else
      con.query("SELECT * FROM waypoint", function (err, result, fields) {
        if (err) res.status(400).send(err.code);
        else {
          var fileContents = kmlCreator.createKML(result);
          fs.writeFile(savedFilePath, fileContents, function (err) {
            if (err) console.log(err);
            res.status(200).download(savedFilePath, "waypoints.kml");
          });
        }
        con.release();
      });
  });
});

module.exports = router;