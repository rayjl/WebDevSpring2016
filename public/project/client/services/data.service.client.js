(function() {
    'use strict';

    angular
        .module("ZapApp")
        .factory("DataService", DataService);

    function DataService($http, $q) {

        // --------------------------------------------------------------------

        // Create a container to return
        var service = {
            addSavedListing: addSavedListing,
            findAllSavedListings: findAllSavedListings,
            findSavedListingById: findSavedListingById,
            deleteSavedListingById: deleteSavedListingById
        };
        return service;

        // --------------------------------------------------------------------

        function addSavedListing(listing) {
            var defer = $q.defer();
            $http
                .post("/api/project/listing", listing)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllSavedListings() {
            var defer = $q.defer();
            $http
                .get("/api/project/listing")
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findSavedListingById(listingId) {
            var defer = $q.defer();
            $http
                .get("/api/project/listing/" + listingId)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteSavedListingById(listingId) {
            var defer = $q.defer();
            $http
                .delete("/api/project/listing/" + listingId)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

    }

})();