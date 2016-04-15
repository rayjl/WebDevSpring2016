'use strict';

module.exports = function(mongoose) {
    var userSchema = mongoose.Schema(
        {
            roles: [String],
            firstName: String,
            lastName: String,
            username: String,
            password: String,
            emails: [String],
            phones: [String]
        },
        {
            collection: "user"
        });

    return userSchema;
};