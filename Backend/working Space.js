const client = require('./lib/client.js')


const response = client.apiCall("v1/services/getAll.json", {});

function getServiceId() {
    for (i = 0; i <= 4; i++) {
        const serviceId = response.services.service[i].id
        serviceArr.push(serviceId)
    }
}
getServiceId()

async function locationId(id, location) {
    const response = await client.apiCall("v1/services/getInfo", {id: serviceArr[0]})
}



app.get("/api/message", (req, res) => {
    // console.log("Recieved request")
    res.json({message: "Hey, it worked"})
})


// OLD FETCHES
fetch("http://localhost:8000/test")
    .then(response => response.json())
    .then(data => {console.log(data)})
    .catch(error => console.error("Error:", error))

fetch("http://localhost:8000/api/service")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error))

// OLD FUNCTIONS
const locationDetails = async (locationId) => {
    const response = await client.apiCall("v1/services/getInfo.json", {id: locationId,});
    locationObject = response.service[0]
    }
    
    app.get("/api/details", async (req, res) => {
        try {
            await locationDetails(serviceArr[0])
            res.json(locationObject)
        } catch (error) {
            console.error("Error fetching location name: ", error);
            res.status(500).json({ error: "failed to fetch location details"});
        }
        
    })
