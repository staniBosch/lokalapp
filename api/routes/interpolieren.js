var express = require('express');
var router = express.Router();
var db = require('../models/database');



// Service fürs Interpolieren von Koordinaten 
router.post('/', function(req, res) { 
  var interpoliert = [];   
   //i=0
   for(var ai = 0; ai<req.body.length-1; ai++){
    var x0 = req.body[ai].latitude
    var y0 = req.body[ai].longitude
    var x1 = req.body[ai+1].latitude
    var y1 = req.body[ai+1].longitude   
     var t0 = req.body[ai].timestamp;
     var t1 = req.body[ai+1].timestamp;
     var tdiff = t1-t0;
    for(var i = 0; i<tdiff; i++){
       var xtel = (x1-x0)*i/tdiff;
       var ytel = (y1-y0)*i/tdiff;   
       var ttel = t0+i;
       interpoliert.push[{"latitude":xtel,"longitude":ytel,"timestamp":ttel}]  
    }    
   }
   res.status(200).send(interpoliert);
   res.end();  
});

router.post('/ms', function(req, res) {

  var interpoliert = [];
   
  //i=0

  for(var ai = 0; ai<req.body.length-1; ai++){
   var x0 = req.body[ai].latitude
   var y0 = req.body[ai].longitude
   var x1 = req.body[ai+1].latitude
   var y1 = req.body[ai+1].longitude
  
    var t0 = req.body[ai].timestamp;
    var t1 = req.body[ai+1].timestamp;
    var tdiff = t1-t0;
   for(var i = 0; i<tdiff; i++){
      var xtel = (x1-x0)*i/tdiff;
      var ytel = (y1-y0)*i/tdiff;   
      var ttel = t0+i;
      interpoliert.push[{"latitude":xtel,"longitude":ytel,"timestamp":ttel}]  
   }
   res.status(200).send(interpoliert);
  }

});

module.exports = router;