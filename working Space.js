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