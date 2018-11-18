# lokalappRest
lokalappRest is a Restful Service for gathering Sensor-Data. Its written in Javascript and requieres Node.js.

Content-Type is Json.

The Service is running on Port 3000.
To use the code modify the api/models/database.js.
Run npm -install.

### Example Server
http://sbcon.ddns.net:3000/api/gps

### Paths

| Usage  | GET | POST  | POST-JSON-Data |
| ------------- | ------------- | ------------- | ------------- |
| *Session*  | .../api/session  | .../api/session  | {"value":"Value-String"}  |
| *Session with SensorData*  | .../api/session/id/:id/:sensor  | ---  | ---  |

| Sensor  | GET | POST  | POST-JSON-Data |
| ------------- | ------------- | ------------- | ------------- |
| *GPS*  | .../api/gps  | .../api/gps  | {"Latitude":"Value-Double", "Longitude:"Value-Double", "Hoehe":"Value-Double", "session_id":"Value-Integer"}  |
| *Accelerometer*  | .../api/accelerometer  | .../api/accelerometer  | {"x":"Value-Double", "y:"Value-Double", "z":"Value-Double", "session_id":"Value-Integer"}  |
| *Batterie*  | .../api/batterie  | .../api/batterie  | {"Value":"Value-Double", "session_id":"Value-Integer"}  |
| *Gyroskop*  | .../api/gyroskop  | .../api/gyroskop  | {"x":"Value-Double", "y:"Value-Double", "z":"Value-Double", "session_id":"Value-Integer"}  |
| *Kompass*  | .../api/kompass  | .../api/kompass  | {"degree":"Value-Double", "session_id":"Value-Integer"}  |
| *Licht*  | .../api/licht  | .../api/licht  | {"value":"Value-Float", "session_id":"Value-Integer"}  |
| *Luftfeuchtigkeit*  | .../api/luftfeuchtigkeit  | .../api/luftfeuchtigkeit  | {humidity:"Value-Double", "session_id":"Value-Integer"}  |
| *Magnetometer*  | .../api/magnetometer  | .../api/magnetometer  | {"x":"Value-Double", "y:"Value-Double", "z":"Value-Double", "session_id":"Value-Integer"}  |
| *Netzwerklokalisierung*  | .../api/netzwerklokalisierung  | .../api/netzwerklokalisierung  | {"Value":"Value-Double", "session_id":"Value-Integer"}  |
| *Proximity*  | .../api/proximity  | .../api/proximity  | {"Value":"Value-Double", "session_id":"Value-Integer"}  |
| *Schrittzaehler*  | .../api/schrittzaehler  | .../api/schrittzaehler  | {"Value":"Value-Double", "session_id":"Value-Integer"}  |
| *Schwerkraft*  | .../api/schwerkraft  | .../api/schwerkraft  | {"Value":"Value-Double", "session_id":"Value-Integer"}  |
| *Umgebungsluftdruck*  | .../api/umgebungsluftdruck  | .../api/umgebungsluftdruck  | {"Value":"Value-Double", "session_id":"Value-Integer"}  |
| *Umgebungstemperatur*  | .../api/umgebungstemperatur  | .../api/umgebungstemperatur  | {"Value":"Value-Double", "session_id":"Value-Integer"}  |
| *Wifi*  | .../api/wifi  | .../api/wifi  | {"Value":"Value-Double", "session_id":"Value-Integer"}  |




