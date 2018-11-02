# lokalappRest
lokalappRest is a Restful Service for gathering Sensor-Data. Its written in Javascript and requieres Node.js.
Content-Type is Json.

The Service is running on Port 3000.
To use the code modify the api/models/database.js.
Run npm -install.

http://sbcon.ddns.net:3000/api/...

# Paths


| Sensor  | GET | POST  | POST-JSON-Data |
| ------------- | ------------- | ------------- | ------------- |
| GPS  | .../api/gps  | .../api/gps  | {"Latitude":"Value-Double", "Longitude:"Value-Double", "Hoehe":"Value-Double"}  |
| Accelerometer  | .../api/accelerometer  | .../api/accelerometer  | {}  |
| Batterie  | .../api/batterie  | .../api/batterie  | {}  |
| Gyroskop  | .../api/gyroskop  | .../api/gyroskop  | {}  |
| Kompass  | .../api/kompass  | .../api/kompass  | {}  |
| Licht  | .../api/licht  | .../api/licht  | {}  |
| Luftfeuchtigkeit  | .../api/luftfeuchtigkeit  | .../api/luftfeuchtigkeit  | {}  |
| Magnetometer  | .../api/magnetometer  | .../api/magnetometer  | {}  |
| Netzwerklokalisierung  | .../api/netzwerklokalisierung  | .../api/netzwerklokalisierung  | {}  |
| Proximity  | .../api/proximity  | .../api/proximity  | {}  |
| Schrittzaehler  | .../api/schrittzaehler  | .../api/schrittzaehler  | {}  |
| Schwerkraft  | .../api/schwerkraft  | .../api/schwerkraft  | {}  |
| Umgebungsluftdruck  | .../api/umgebungsluftdruck  | .../api/umgebungsluftdruck  | {}  |
| Umgebungstemperatur  | .../api/umgebungstemperatur  | .../api/umgebungstemperatur  | {}  |
| Wifi  | .../api/wifi  | .../api/wifi  | {}  |




