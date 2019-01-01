var express = require('express');
var router = express.Router();
var db = require('../models/database');
const kmlCreator = require("../service/GEOCreator.js");
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
router.get('/:session_id/:name', function (req, res, next) {

    /* TODO:
     * get all messwerte-data from the database
     */
    var name = req.params.name;
    var session_id = req.params.session_id;
    var sql = "SELECT * FROM messwerte inner join messwerteroute on messwerte.messwerteroute_name=messwerteroute.name where session_id=" + session_id+" AND messwerteroute.name="+name;
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
    var sql = "INSERT INTO messwerte (id, timestamp, latitude, longitude, altitude, indoor, messwerteroute_name, session_id ) VALUES (NULL, '"
        + req.body.timestamp + "', '"
        + req.body.latitude + "', '"
        + req.body.longitude + "', '"
        + req.body.altitude + "', '"
        + req.body.indoor + "', '"
        + req.body.messwerteroute_name + "', '"
        + req.body.session_id + "')";
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