'use strict';

module.exports = function(mongoose) {
    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var formSchema = mongoose.Schema(
        {
            _id: String,
            userId: String,
            title: String,
            fields: [fieldSchema],
            created: { type: Date, default: Date.now },
            updated: { type: Date, default: Date.now }
        },
        {
            collection: "form"
        });

    return formSchema;
};
