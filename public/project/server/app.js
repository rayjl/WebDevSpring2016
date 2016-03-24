'use strict';

module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    var dataModel = require("./models/data.model.js")();

    require("./services/user.service.server.js")(app, userModel);
    require("./services/data.service.server.js")(app, dataModel);
};