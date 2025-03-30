const test = require('./lib/client.js')

// @param [String] endPoint for example: "people/getAll" or "groups/GetInfo"
// @param [Object] option List of parametrs
// @param [Function] callback for response body. If callback is not present, then call will be synchronous
// @return [Object] response body
test.apiCall("v1/services/getAll.json", {})


