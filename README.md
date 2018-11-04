# lokalappRest
lokalappRest is a Restful Service for gathering Sensor-Data. Its written in Javascript and requieres Node.js.

Content-Type is Json.

The Service is running on Port 3000.
To use the code modify the api/models/database.js.
Run npm -install.

### Example Server
http://sbcon.ddns.net:3000/api/gps

### Paths


| Sensor  | GET | POST  | POST-JSON-Data |
| ------------- | ------------- | ------------- | ------------- |
| *GPS*  | .../api/gps  | .../api/gps  | {"Latitude":"Value-Double", "Longitude:"Value-Double", "Hoehe":"Value-Double"}  |
| *Accelerometer*  | .../api/accelerometer  | .../api/accelerometer  | {"x":"Value-Double", "y:"Value-Double", "z":"Value-Double"}  |
| *Batterie*  | .../api/batterie  | .../api/batterie  | {"Value":"Value-Double"}  |
| *Gyroskop*  | .../api/gyroskop  | .../api/gyroskop  | {"x":"Value-Double", "y:"Value-Double", "z":"Value-Double"}  |
| *Kompass*  | .../api/kompass  | .../api/kompass  | {"degree":"Value-Double"}  |
| *Licht*  | .../api/licht  | .../api/licht  | {"lux":"Value-Float"}  |
| *Luftfeuchtigkeit*  | .../api/luftfeuchtigkeit  | .../api/luftfeuchtigkeit  | {humidity:"Value-Double"}  |
| *Magnetometer*  | .../api/magnetometer  | .../api/magnetometer  | {"x":"Value-Double", "y:"Value-Double", "z":"Value-Double"}  |
| *Netzwerklokalisierung*  | .../api/netzwerklokalisierung  | .../api/netzwerklokalisierung  | {"Value":"Value-Double"}  |
| *Proximity*  | .../api/proximity  | .../api/proximity  | {"Value":"Value-Double"}  |
| *Schrittzaehler*  | .../api/schrittzaehler  | .../api/schrittzaehler  | {"Value":"Value-Double"}  |
| *Schwerkraft*  | .../api/schwerkraft  | .../api/schwerkraft  | {"Value":"Value-Double"}  |
| *Umgebungsluftdruck*  | .../api/umgebungsluftdruck  | .../api/umgebungsluftdruck  | {"Value":"Value-Double"}  |
| *Umgebungstemperatur*  | .../api/umgebungstemperatur  | .../api/umgebungstemperatur  | {"Value":"Value-Double"}  |
| *Wifi*  | .../api/wifi  | .../api/wifi  | {"Value":"Value-Double"}  |




