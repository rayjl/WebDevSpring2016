'use strict';

module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user.model.js")(db, mongoose);
    var dataModel = require("./models/data.model.js")(db, mongoose);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/data.service.server.js")(app, dataModel);
};