module.exports = function (app) {
    var express = require('express');
    var router = express.Router();

    
    router.get('/download', function (req, res) {

        var file = __dirname + '/public/download/1000TheGame.exe';
        res.download(file); // Set disposition and send it.

    });
    //app.use('/api/lokalapp', router);
    app.use('/api/1000TheGame/download', router);


    // Require REST-Routes
    //const gpsRouter = require('./routes/gps');
   
    

    // Set REST-Routes
    //app.use('/api/lokalapp/gps', gpsRouter);
    
  

}