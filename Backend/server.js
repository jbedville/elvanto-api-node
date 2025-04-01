const express = require("express");
const cors = require("cors");
const client = require("./lib/client.js");

const app = express();
app.use(cors());

let serviceArr = [];
let locationObject 

const getId = async () => {
  const response = await client.apiCall("v1/services/getAll.json", {});
  serviceArr = response.services.service.slice(0, 5).map((s) => s.id);
};

const locationDetails = async (locationId) => {
  if (!locationId) {
    console.error("No locationId provided");
    return;
  }
  const response = await client.apiCall("v1/services/getInfo.json", {id: locationId, fields: ["volunteers"]});
  locationObject = response.service;
};



const initServices = async () => {
    await getId();
    // console.log("Service IDs: ", serviceArr)
    // console.log(locationObject)
}

app.get("/api/service", async (req, res) => {
  try {
    await getId();
    res.json(serviceArr);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch service data" });
  }
});

app.get("/details/Morayfield830", async (req, res) => {
  try {
    if (serviceArr.length === 0) {
      throw new Error("serviceArr is empty");
    }
    await locationDetails(serviceArr[0]);
    res.json(locationObject);
  } catch (error) {
    console.error("Error fetching location details: ", error);
    res.status(500).json({ error: "failed to fetch location details" });
  }
});

app.get("/details/Warner930", async (req, res) => {
  try {
    if (serviceArr.length === 0) {
      throw new Error("serviceArr is empty");
    }
    await locationDetails(serviceArr[1]);
    res.json(locationObject);
  } catch (error) {
    console.error("Error fetching location details: ", error);
    res.status(500).json({ error: "failed to fetch location details" });
  }
});

app.get("/details/Redcliffe930", async (req, res) => {
  try {
    if (serviceArr.length === 0) {
      throw new Error("serviceArr is empty");
    }
    await locationDetails(serviceArr[2]);
    res.json(locationObject);
  } catch (error) {
    console.error("Error fetching location details: ", error);
    res.status(500).json({ error: "failed to fetch location details" });
  }
});

app.get("/details/Morayfield1030", async (req, res) => {
  try {
    if (serviceArr.length === 0) {
      throw new Error("serviceArr is empty");
    }
    await locationDetails(serviceArr[3]);
    res.json(locationObject);
  } catch (error) {
    console.error("Error fetching location details: ", error);
    res.status(500).json({ error: "failed to fetch location details" });
  }
});

app.get("/details/Warner530", async (req, res) => {
  try {
    if (serviceArr.length === 0) {
      throw new Error("serviceArr is empty");
    }
    await locationDetails(serviceArr[4]);
    res.json(locationObject);
  } catch (error) {
    console.error("Error fetching location details: ", error);
    res.status(500).json({ error: "failed to fetch location details" });
  }
});

const PORT = 8000;
initServices().then(() => {
  console.log("Services Initialized")  
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error) => {
    console.error("Failied to Init Services:", error)
});

