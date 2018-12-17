var express = require('express');
var router = express.Router();
var db = require('../models/database');
const xmlparser = require('express-xml-bodyparser');
const kmlCreator = require("../service/KMLCreator.js");

// GET /api/lokalisierung/
router.get('/', function (req, res, next) {

    /* TODO:
     * get all lokalisierung-data from the database
     */

    db.pool.getConnection(function (err, con) {
        if (err) return res.status(400).send("Database Error");
        else
            con.query("SELECT * FROM lokalisierung", function (err, result, fields) {
                if (err) throw err;
                else res.status(200).send(result);
                res.end();
                con.release();
            });
    });
});

// POST /api/lokalisierung/
router.post('/', function (req, res) {

    /* TODO:
     * create an lokalisierung-sensor-data and add it to the database
     */
    var temp;
    if (req.body instanceof Array){
        temp = req.body[0];
    }       
    else
        temp = req.body;

    var sql = "INSERT INTO lokalisierung (id, timestamp, latitude, longitude, altitude, beschreibung, session_id) VALUES (NULL, '"
    + temp.timestamp +"', '" 
    + temp.latitude + "', '" 
    + temp.longitude + "','" 
    + temp.altitude + "','" 
    + temp.beschreibung + "','" 
    + temp.session_id + "')";

    db.pool.getConnection(function (err, con) {
        if (err) return res.status(400).send("Database Error");
        else
            con.query(sql, function (err, result) {
                if (err) res.status(400).send(err);
                else {
                    console.log("Data created and added");
                    res.send(req.body);
                }
                res.end();
                con.release();
            });
    });

});

// Delete /api/gps/clear
router.delete('/clear', function (req, res) {

    var sql = 'DELETE FROM lokalisierung';

    db.pool.getConnection(function (err, con) {
        if (err) return res.status(400).send("Database Error");
        else
            con.query(sql, function (err, result) {
                if (err) throw err;
                else {
                    console.log("Data was deleted");
                    res.send('Got a DELETE request at lokalisierung');
                }
                res.end();
                con.release();
            });
    });
});

router.get('/kml', xmlparser({trim: false, explicitArray: false}), function(req, res, next) {
    // check req.body  
    
    db.pool.getConnection(function (err, con) {
        if (err) return res.status(400).send("Databse Error");
        else
          con.query("SELECT * FROM lokalisierung", function (err, result, fields) {
            if (err) res.status(400).send(err.code);
            else res.status(200).send(kmlCreator.createKML(result));
            res.end();
            con.release();
          });
      });

  });

module.exports = router;