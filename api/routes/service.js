var express = require('express');
var router = express.Router();
const geoCreator = require("../service/GEOCreator.js");
var fs = require('fs');



// Service fürs Interpolieren von Koordinaten in ms schritten
router.post('/interpolieren/ms', function (req, res) {
  var timefactor = 1;
  if (req.body.length > 1)
    if (req.body[0].timestamp < 90000000000)
      timefactor = 1000;
  var interpoliert = [{ "latitude": req.body[0].latitude, "longitude": req.body[0].longitude, "timestamp": (req.body[0].timestamp * timefactor) }];
  //i=0
  for (var ai = 0; ai < req.body.length - 1; ai++) {
    var x0 = Number(req.body[ai].latitude);
    var y0 = Number(req.body[ai].longitude);
    var x1 = Number(req.body[ai + 1].latitude);
    var y1 = Number(req.body[ai + 1].longitude);
    var t0 = Number(req.body[ai].timestamp) * timefactor;
    var t1 = Number(req.body[ai + 1].timestamp) * timefactor;
    var tdiff = t1 - t0;
    for (var t = 1; t < tdiff + 1; t++) {
      var xdiff = (x1 - x0) * t / tdiff;
      var ydiff = (y1 - y0) * t / tdiff;
      var xtel = Number(x0) + Number(xdiff);
      var ytel = Number(y0) + Number(ydiff);
      var ttel = Number(t0) + Number(t);
      interpoliert.push({ "latitude": xtel, "longitude": ytel, "timestamp": ttel });
    }
  }
  res.status(200).send(interpoliert);
  res.end();
});

// Service fürs Interpolieren von Koordinaten in ms schritten
router.post('/interpolieren/s', function (req, res) {
  var timefactor = 1;
  if (req.body.length > 1)
    if (req.body[0].timestamp > 90000000000)
      timefactor = 1 / 1000;
  var interpoliert = [{ "latitude": req.body[0].latitude, "longitude": req.body[0].longitude, "timestamp": (Math.round(req.body[0].timestamp * timefactor)) }];
  //i=0
  for (var ai = 0; ai < req.body.length - 1; ai++) {
    var x0 = Number(req.body[ai].latitude);
    var y0 = Number(req.body[ai].longitude);
    var x1 = Number(req.body[ai + 1].latitude);
    var y1 = Number(req.body[ai + 1].longitude);
    var t0 = Math.round(Number(req.body[ai].timestamp) * timefactor);
    var t1 = Math.round(Number(req.body[ai + 1].timestamp) * timefactor);
    var tdiff = t1 - t0;
    for (var t = 1; t < tdiff + 1; t++) {
      var xdiff = (x1 - x0) * t / tdiff;
      var ydiff = (y1 - y0) * t / tdiff;
      var xtel = Number(x0) + Number(xdiff);
      var ytel = Number(y0) + Number(ydiff);
      var ttel = Number(t0) + Number(t);
      interpoliert.push({ "latitude": xtel, "longitude": ytel, "timestamp": ttel });
    }
  }
  res.status(200).send(interpoliert);
  res.end();
});

// Service fürs Interpolieren von Koordinaten in ms schritten
router.get('/interpolieren/s/:data', function (req, res) {
  var timefactor = 1;
  var data = JSON.parse(req.params.data);
  if (data.length > 1)
    if (data[0].timestamp > 90000000000)
      timefactor = 1 / 1000;
  var interpoliert = [{ "latitude": data[0].latitude, "longitude": data[0].longitude, "timestamp": (Math.round(data[0].timestamp * timefactor)) }];
  //i=0
  for (var ai = 0; ai < data.length - 1; ai++) {
    var x0 = Number(data[ai].latitude);
    var y0 = Number(data[ai].longitude);
    var x1 = Number(data[ai + 1].latitude);
    var y1 = Number(data[ai + 1].longitude);
    var t0 = Math.round(Number(data[ai].timestamp) * timefactor);
    var t1 = Math.round(Number(data[ai + 1].timestamp) * timefactor);
    var tdiff = t1 - t0;
    for (var t = 1; t < tdiff + 1; t++) {
      var xdiff = (x1 - x0) * t / tdiff;
      var ydiff = (y1 - y0) * t / tdiff;
      var xtel = Number(x0) + Number(xdiff);
      var ytel = Number(y0) + Number(ydiff);
      var ttel = Number(t0) + Number(t);
      interpoliert.push({ "latitude": xtel, "longitude": ytel, "timestamp": ttel });
    }
  }
  res.status(200).send(interpoliert);
  res.end();
});




router.get('/kml/:jsonarray', function (req, res){
  var data = JSON.parse(req.params.jsonarray);
  var fileName = "/../../public/tmp.kml";
  var savedFilePath = __dirname + fileName;
  var fileContents = geoCreator.createKML(data);
  fs.writeFile(savedFilePath, fileContents, function (err) {
    if (err) console.log(err);
    res.status(200).download(savedFilePath, "kmlfile.kml");
  });
});
module.exports = router;

router.get('/gpx/:jsonarray', function (req, res){
  var data = JSON.parse(req.params.jsonarray);
  var fileName = "/../../public/tmp.gpx";
  var savedFilePath = __dirname + fileName;
  var fileContents = geoCreator.createGPX(data);
  fs.writeFile(savedFilePath, fileContents, function (err) {
    if (err) console.log(err);
    res.status(200).download(savedFilePath, "gpxfile.gpx");
  });
});
module.exports = router;