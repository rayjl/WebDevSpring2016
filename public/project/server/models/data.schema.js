'use strict';

// Data schema for the project
module.exports = function(mongoose) {
    var dataSchemaP = mongoose.Schema(
        {
            street: String,
            city: String,
            state: String,
            zestimate: String,
            details: String
        },
        {
            collection: "dataP"
        });
    return dataSchemaP;
};
