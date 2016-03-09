(function() {
    'use strict';

    angular
        .module("ZapApp")
        .factory("DataService", DataService);

    function DataService() {

        // Default saved listings
        var list1 = {
            "_id"           : 1,
            "street"        : "12345 Street",
            "city"          : "A-City",
            "state"         : "Orb",
            "zestimate"     : 5000000,
            "details"       : []
        };
        var list2 = {
            "_id"           : 2,
            "street"        : "12345 Street",
            "city"          : "B-City",
            "state"         : "Orb",
            "zestimate"     : 10000000,
            "details"       : []
        };
        var list3 = {
            "_id"           : 3,
            "street"        : "12345 Street",
            "city"          : "C-City",
            "state"         : "Orb",
            "zestimate"     : 15000000,
            "details"       : []
        };
        var listings = [list1, list2, list3];

        // Create container to return
        var service = {
            findAllSavedListings: findAllSavedListings,
            findSavedListingById: findSavedListingById,
            addSavedListing: addSavedListing,
            deleteSavedListingById: deleteSavedListingById,
            listings: listings
        };
        return service;

        /*
         * @param   {func} callback     : callback function
         */
        function findAllSavedListings(callback) {
            callback(listings);
        }

        /*
         * @param   {int} listingId     : id for the listing to locate
         * @param   {func} callback     : callback function
         */
        function findSavedListingById(listingId, callback) {
            for (var i = 0; i < listings.length; i++) {
                if (listings[i]._id == listingId) {
                    callback(listings[i]);
                    break;
                }
            }
        }

        /*
         * @param   {object} listing    : listing to add
         * @param   {func} callback     : callback function
         */
        function addSavedListing(listing, callback) {
            var listingId = (new Date).getTime();
            listing._id = listingId;
            listings.push(listing);
            callback(listings);
        }

        /*
         * @param   {int} listingId     : id for listing to delete
         * @param   {func} callback     : callback function
         */
        function deleteSavedListingById(listingId, callback) {
            for (var i = 0; i < listings.length; i++) {
                if (listings[i]._id == listingId) {
                    listings.splice(i,1);
                    break;
                }
            }
            callback(listings);
        }

    }

})();