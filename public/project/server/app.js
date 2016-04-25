'use strict';

module.exports = function(app, db, mongoose) {
    var userModelP = require("./models/user.model.js")(db, mongoose);
    var dataModelP = require("./models/data.model.js")(db, mongoose, userModelP);

    require("./services/user.service.server.js")(app, userModelP);
    require("./services/data.service.server.js")(app, dataModelP);
};