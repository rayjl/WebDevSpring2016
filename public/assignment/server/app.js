'use strict';

module.exports = function(app, mongoose) {
    var userModel = require("./models/user.model.server.js")(mongoose);
    var formModel = require("./models/form.model.server.js")(mongoose);
    var fieldModel = require("./models/field.model.server.js")(mongoose);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, fieldModel);
};