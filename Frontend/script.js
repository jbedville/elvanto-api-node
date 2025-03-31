fetch("http://localhost:8000/test")
    .then(response => response.json())
    .then(data => {console.log(data)})
    .catch(error => console.error("Error:", error))

    fetch("http://localhost:8000/api/service")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error))

    fetch("http://localhost:8000/location/name")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error: ", error))