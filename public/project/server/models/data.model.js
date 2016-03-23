'use strict';
var q = require('q');

module.exports = function() {

    var listings = require('./data.test.json');

    // ------------------------------------------------------------------------

    var api = {
        findAllSavedListings: findAllSavedListings,
        findSavedListingById: findSavedListingById,
        addSavedListing: addSavedListing,
        deleteSavedListingById: deleteSavedListingById,
    };
    return api;

    // ------------------------------------------------------------------------

    function findAllSavedListings() {
        var defer = q.defer();
        defer.resolve(listings);
        return defer.promise;
    }

    function findSavedListingById(listingId) {
        var defer = q.defer();
        for (var i = 0; i < listings.length; i++) {
            if (listings[i]._id == listingId) {
                defer.resolve(listings[i]);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function addSavedListing(listing) {
        var defer = q.defer();
        var listingId = (new Date).getTime();
        listing._id = listingId;
        listings.push(listing);
        defer.resolve(listings);
        return defer.promise;
    }

    function deleteSavedListingById(listingId) {
        var defer = q.defer();
        for (var i = 0; i < listings.length; i++) {
            if (listings[i]._id == listingId) {
                listings.splice(i,1);
                break;
            }
        }
        defer.resolve(listings);
        return defer.promise;
    }

};