module.exports = {

    createKML(data) {

        var kml = this.createHeadKML();
        var folder = kml.ele('Folder');
        for (var i = 0; i < data.length; i++) {
            var place = folder.ele('Placemark');
            place.ele('name', data[i]["id"] + " " + "Deutschland");
            place.ele('description', "UNIX-Timestamp[ms]:" + data[i]["timestamp"]);
            place.ele('Point').ele('coordinates', data[i]["longitude"] + ',' + data[i]["latitude"]);
        }
        return kml.end({ pretty: true });
    },
    createHeadKML() {
        var builder = require('xmlbuilder');
        var xml = builder.create('kml', { version: '1.0', encoding: 'UTF-8' })
            .attribute({ xmlns: 'http://www.opengis.net/kml/2.2' });
        return xml;
    },

    createGPX(data) {

        var kml = this.createHeadGPX();
        for (var i = 0; i < data.length; i++) {
            var date = new Date(Number(data[i]["timestamp"]));
            var wpt = kml.ele('wpt').attribute({ 'lat': data[i]["latitude"], 'lon': data[i]["longitude"] });
            wpt.ele('time', date);
        }
        return kml.end({ pretty: true });
    },
    createHeadGPX() {
        var builder = require('xmlbuilder');
        var xml = builder.create('gpx', { version: '1.0', encoding: 'UTF-8' })
            .attribute({ xmlns: "http://www.topografix.com/GPX/1/1", version: "1.1", creator: "team1", 'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance" , 'xsi:schemaLocation':"http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" });
        return xml;
    }
}
