const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// In-memory storage for air quality data
let sensorData = [
    { station: "CentralPlaza Rayong", pm25: 50,temperature:27,humidity:50, lat: 12.69649, lon: 101.2694598 }, 
    { station: "Rayongwit", pm25: 20,temperature:25,humidity:70, lat: 12.6688932, lon: 101.2725858 }  , 
];

// Endpoint to check server status
app.get('/status', (req, res) => {
    res.json({ status: "online" });
});

// Endpoint to fetch air quality data
app.get('/data', (req, res) => {
    res.json(sensorData);
});
app.post('/addstation', (req, res) => {
    const { station, lat , lon } = req.body;
    

    const index = sensorData.findIndex(data => data.station === station);
    if(index >= 0) {
        sensorData[index].lat = lat;
        sensorData[index].lon = lon;
        res.json({ success: true, message: "station updated successfully" });
    }else{
        const newstation = { station: station, pm25: null,temperature:null,humidity:null, lat: lat, lon: lon };
        sensorData.push(newstation);
        res.json({ success: true, message: "station added successfully" });
    }
    console.log("Received Data:", req.body);

});
app.post('/update', (req, res) => {
    const { station, temperature, humidity, pm25 } = req.body;
    
    if (!station || temperature === undefined || humidity === undefined || pm25 === undefined) {
        return res.status(400).json({ success: false, message: "Missing data" });
    }

    const index = sensorData.findIndex(data => data.station === station);

    if (index >= 0) {
        sensorData[index].temperature = temperature;
        sensorData[index].humidity = humidity;
        sensorData[index].pm25 = pm25;
        console.log("Received Data:", req.body);
        res.json({ success: true, message: "Data updated successfully" });
    } else {
        console.log("Received Data:", req.body);
        res.json({ success: false, message: "cant find station" });
    }

});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
