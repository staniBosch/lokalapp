module.exports = {
    createKML(data) {

        var kml = this.createHead();
        var folder = kml.ele('Folder');
        for (var i = 0; i < data.length; i++) {
            var place = folder.ele('Placemark');
            place.ele('name', data[i]["id"]+" "+"Deutschland");
            place.ele('description', "UNIX-Timestamp[ms]:"+data[i]["timestamp"]);
            place.ele('Point').ele('coordinates', data[i]["longitude"] + ',' + data[i]["latitude"]);            
        }
        return kml.end({ pretty: true });
    },
    createHead() {
        var builder = require('xmlbuilder');
        var xml = builder.create('kml', { version: '1.0', encoding: 'UTF-8' })
            .attribute({ xmlns: 'http://www.opengis.net/kml/2.2' });


        return xml;
    }
}
