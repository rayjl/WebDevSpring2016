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
            following: [String],
            followers: [String],
            savedListings: [String]
        },
        {
            collection: "userP"
        });
    return userSchemaP;
};
