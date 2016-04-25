'use strict';

// User schema for the project
module.exports = function(mongoose) {
    var userSchemaP = mongoose.Schema(
        {
            firstName: String,
            lastName: String,
            username: String,
            password: String,
            email: String,
            accountType: String,
            following: [Object],
            followers: [Object],
            savedListings: [String]
        },
        {
            collection: "userP"
        });
    return userSchemaP;
};
