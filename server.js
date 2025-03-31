const express = require('express');
const cors = require('cors')
const client = require('./lib/client.js')
const service = require('./serviceArr.js')
// const {serviceArr, locationName, getServiceId, locationId} = require('./serviceArr.js') 

const app = express();
app.use(cors())

//API CALLS
    app.get("/api/service", async (req, res) => {
        try {
            
            // console.log(serviceArr)
            res.json(serviceArr)
        } catch (error) {
            console.error("Error fetching services:", error);
            res.status(500).json({ error: "Failed to fetch service data" });
        }
    })
    
    app.get("/location/name", async (req, res) => {
        try {
            const response = await client.apiCall("v1/services/getInfo.json", {id: "a8c0bdb9-cb14-4c14-a7f2-9a3855d1c226",});
            locationName = response.service[0].location.name;
            // console.log(locationName);
        res.json(locationName)
        } catch (error) {
            console.error("Error fetching location name: ", error);
            res.status(500).json({ error: "failed to fetch location name"});
        }
        
    })

    app.get("/test", (req, res) => {
        res.json({"message": "It is working"})
    })

    const PORT = 8000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))