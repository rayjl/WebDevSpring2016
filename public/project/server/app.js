'use strict';

module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/data.model.js")();

    require("./services/user.service.server.js")(app, userModel);
    require("./services/form.service.server.js")(app, formModel);
};