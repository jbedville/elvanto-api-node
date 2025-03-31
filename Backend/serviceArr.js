const client = require("./lib/client.js");

let serviceArr = [];
let locationName = '';

async function getServiceId() {
  try {
    const response = await client.apiCall("v1/services/getAll.json", {});
    serviceArr = response.services.service.slice(0, 5).map((s) => s.id);
    console.log(serviceArr);
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}

async function locationId() {
  const response = await client.apiCall("v1/services/getInfo.json", {id: "a8c0bdb9-cb14-4c14-a7f2-9a3855d1c226",});
  locationName = response.service[0].location.name;
  console.log(locationName);
}

const [Morayfield830, Warner930, Redcliffe930, Morayfield1030, Warner530] = serviceArr;


module.exports = { serviceArr, locationName, getServiceId, locationId };
