var express = require('express');
var router = express.Router();
var db = require('../models/database');
const kmlCreator = require("../service/GEOCreator.js");
var fs = require('fs');

// GET /api/lokalisierung/
router.get('/', function (req, res, next) {

    /* TODO:
     * get all lokalisierung-data from the database
     */

    db.pool.getConnection(function (err, con) {
        if (err) return res.status(400).send("Database Error");
        else
            con.query("SELECT * FROM lokalisierung ORDER BY timestamp", function (err, result, fields) {
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
    if (req.body instanceof Array) {
        db.pool.getConnection(function (err, con) {
            if (err) return res.status(400).send("Databse Error");
            else {
                for (var i = 0; i < req.body.length; i++) {
                    var sql = "INSERT INTO lokalisierung (id, timestamp, latitude, longitude, altitude, beschreibung, session_id) VALUES (NULL, '"
                        + req.body[i].timestamp + "', '"
                        + req.body[i].latitude + "', '"
                        + req.body[i].longitude + "','"
                        + req.body[i].altitude + "','"
                        + req.body[i].beschreibung + "','"
                        + req.body[i].session_id + "')";
                    var bool = true;
                    con.query(sql, function (err, result) {
                        if (err) res.status(400).send(err.code);
                        else {
                            if (bool) { res.send(req.body); res.end(); bool = false; }
                        }
                    });
                }
            }
        });
    }
    else {
        var sql = "INSERT INTO lokalisierung (id, timestamp, latitude, longitude, altitude, beschreibung, session_id) VALUES (NULL, '"
            + req.body.timestamp + "', '"
            + req.body.latitude + "', '"
            + req.body.longitude + "','"
            + req.body.altitude + "','"
            + req.body.beschreibung + "','"
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
    }
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

router.get('/kml', function (req, res, next) {

    db.pool.getConnection(function (err, con) {
        var fileName = "/../../public/tmp.kml";
        var savedFilePath = __dirname + fileName;
        if (err) return res.status(400).send("Databse Error");
        else
            con.query("SELECT * FROM lokalisierung", function (err, result, fields) {
                if (err) res.status(400).send(err.code);
                else {
                    var fileContents = kmlCreator.createKML(result);
                    fs.writeFile(savedFilePath, fileContents, function (err) {
                        if (err) console.log(err);
                        res.status(200).download(savedFilePath, "lokalisierung.kml");
                    });
                }
                con.release();
            });
    });
});

module.exports = router;