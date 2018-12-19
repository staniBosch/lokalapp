var express = require('express');
var router = express.Router();
var db = require('../models/database');
const kmlCreator = require("../service/KMLCreator.js");
var fs = require('fs');


// GET /api/messwerte
router.get('/', function (req, res, next) {

    /* TODO:
     * get all messwerte-data from the database
     */
    db.pool.getConnection(function (err, con) {
        if (err) return res.status(400).send("Databse Error");
        else
            con.query("SELECT * FROM messwerte", function (err, result, fields) {
                if (err) res.status(400).send(err.code);
                else res.status(200).send(result);
                res.end();
                con.release();
            });
    });
});

// GET /api/messwerte/:id/:sensor
router.get('/id/:id/:sensor', function (req, res, next) {

    /* TODO:
     * get all messwerte-data from the database
     */
    var sensor = req.params.sensor;
    var id = req.params.id;
    var sql = "SELECT * FROM messwerte inner join " + sensor + " on session.id=" + sensor + ".session_id where session.id=" + id;
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

// POST /api/messwerte/
router.post('/', function (req, res) {

    /* TODO:
     * create an messwerte-value and add to the database
     */
    var sql = "INSERT INTO messwerte (id, timestamp, latitude, longitude, altitude, indoor, messwerteroute_name ) VALUES (NULL, '"
        + req.body.timestamp + "', '"
        + req.body.latitude + "', '"
        + req.body.longitude + "', '"
        + req.body.altitude + "', '"
        + req.body.indoor + "', '"
        + req.body.messwerteroute_name + "')";
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


router.get('/kml', function (req, res, next) {     

    db.pool.getConnection(function (err, con) {
        var fileName = "/../../public/tmp.kml";
        var savedFilePath = __dirname + fileName;
        if (err) return res.status(400).send("Databse Error");
        else
            con.query("SELECT * FROM messwerte", function (err, result, fields) {
                if (err) res.status(400).send(err.code);
                else {
                    var fileContents = kmlCreator.createKML(result);
                    fs.writeFile(savedFilePath, fileContents, function (err) {
                        if (err) console.log(err);
                        res.status(200).download(savedFilePath, "messwerte.kml");
                    });                    
                }
                con.release();
            });
    });
});

module.exports = router;