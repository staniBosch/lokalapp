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
      con.query("SELECT * FROM netzwerklokalisierung", function (err, result, fields) {
        if (err) throw err;
        else res.status(200).send(result);
        res.end();
        con.release();
      });
  });
});

// POST /api/netzwerklokalisierung/
router.post('/', function (req, res) {

  /* TODO:
   * create an netzwerklokalisierung-value and add to the database
   */
  var temp;
  if (req.body instanceof Array)
    temp = req.body[0];
  else
    temp = req.body;

    if(!temp.hasOwnProperty('latitudeGPS')){
      temp['latitudeGPS'] = 0;
      temp['latitudeGPS'] = 0;
      temp['latitudeGPS'] = 0;
    }
    if(!temp.hasOwnProperty('latitudeNetwork')){
      temp['latitudeNetwork'] = 0;
      temp['longitudeNetwork'] = 0;
      temp['altitudeNetwork'] = 0;
      temp['speedNetwork'] = 0;
    }
    if(!temp.hasOwnProperty('latitudeHighAcc')){
      temp['latitudeHighAcc'] = 0;
      temp['longitudeHighAcc'] = 0;
      temp['altitudeHighAcc'] = 0;
      temp['speedHighAcc'] = 0;
    }
    if(!temp.hasOwnProperty('latitudeBalanced')){
      temp['latitudeBalanced'] = 0;
      temp['longitudeBalanced'] = 0;
      temp['altitudeBalanced'] = 0;
      temp['speedBalanced'] = 0;
    }
    if(!temp.hasOwnProperty('latitudeLowPow')){
      temp['latitudeLowPow'] = 0;
      temp['longitudeLowPow'] = 0;
      temp['altitudeLowPow'] = 0;
      temp['speedLowPow'] = 0;
    }
    if(!temp.hasOwnProperty('latitudeNoPow')){
      temp['latitudeNoPow'] = 0;
      temp['longitudeNoPow'] = 0;
      temp['altitudeNoPow'] = 0;
      temp['speedNoPow'] = 0;
    }
    console.log(temp);

  var sql = 'INSERT INTO netzwerklokalisierung (id, timestamp, latitudeGPS, longitudeGPS, altitudeGPS, speedGPS,' 
    +'latitudeNetwork, longitudeNetwork, altitudeNetwork, speedNetwork,'
    +'latitudeHighAcc, longitudeHighAcc, altitudeHighAcc, speedHighAcc,'
    +'latitudeBalanced, longitudeBalanced, altitudeBalanced, speedBalanced,' 
    +'latitudeLowPow, longitudeLowPow, altitudeLowPow, speedLowPow,' 
    +'latitudeNoPow, longitudeNoPow, altitudeNoPow, speedNoPow, session_id )'
    +' VALUES (NULL, CURRENT_TIMESTAMP, \'' + temp.latitudeGPS  + '\', \'' + temp.longitudeGPS + '\', \'' + temp.altitudeGPS + '\', \'' + temp.speedGPS 
    + temp.latitudeNetwork  + '\', \'' + temp.longitudeNetwork + '\', \'' + temp.altitudeNetwork + '\', \'' + temp.speedNetwork
    + temp.latitudeHighAcc  + '\', \'' + temp.longitudeHighAcc + '\', \'' + temp.altitudeHighAcc + '\', \'' + temp.speedHighAcc
    + temp.latitudeBalanced  + '\', \'' + temp.longitudeBalanced + '\', \'' + temp.altitudeBalanced + '\', \'' + temp.speedBalanced
    + temp.latitudeLowPow  + '\', \'' + temp.longitudeLowPow + '\', \'' + temp.altitudeLowPow + '\', \'' + temp.speedLowPow
    + temp.latitudeNoPow  + '\', \'' + temp.longitudeNoPow + '\', \'' + temp.altitudeNoPow + '\', \'' + temp.speedNoPow + '\', \'' + temp.session_id + '\')';
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query(sql, function (err, result) {
        if (err) throw err;
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