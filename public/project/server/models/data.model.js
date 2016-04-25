'use strict';
var q = require('q');

module.exports = function(db, mongoose, UserModelP) {

    // ------------------------------------------------------------------------

    // Mongoose and MongoDB used
    var DataSchemaP = require("./data.schema.js")(mongoose);
    var DataModelP = mongoose.model("DataModelP", DataSchemaP);

    // ------------------------------------------------------------------------

    var api = {
        findAllSavedListings: findAllSavedListings,
        findSavedListingById: findSavedListingById,
        addSavedListing: addSavedListing,
        deleteSavedListingById: deleteSavedListingById
    };
    return api;

    // ------------------------------------------------------------------------

    function findAllSavedListings() {
        var defer = q.defer();
        DataModelP
            .find(function(err, listings) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(listings);
                }
            });
        return defer.promise;
    }

    function findSavedListingById(listingId) {
        var defer = q.defer();
        DataModelP
            .find({_id: listingId}, function(err, listing) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(listing);
                }
            });
        return defer.promise;
    }

    function addSavedListing(listing) {
        var defer = q.defer();
        DataModelP
            .create(listing, function(err, newListing) {
                if (err) {
                    console.log(err);
                    console.log('Listing not added.');
                    defer.reject(err);
                } else {
                    console.log('Listing added.');
                    defer.resolve(newListing);
                }
            });
        return defer.promise;
    }

    function deleteSavedListingById(listingId) {
        var defer = q.defer();

        // Remove the listing from all users first
        var users = UserModelP.findAllUsers();
        for (var i = 0; i < users.length; i++) {
            users[i].deleteSavedListingById(users[i]._id, listingId);
        }

        // Remove the listing from the DB
        DataModelP
            .remove({_id: listingId}, function(err, status) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(status);
                    }
                });
        return defer.promise;
    }

};