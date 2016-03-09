(function() {
    'use strict';

    angular
        .module("ZapApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, DataService) {
        $scope.removeListing = removeListing;
        $scope.user = $rootScope.user;

        if (user) {
            init();
        }

        /*
         * This function inits the page and loads in the saved listings by user
         */
        function init() {
            var listings = [];
            for (var i = 0; i < user.savedListings.length; i++) {
                DataService
                    .findSavedListingById(user.savedListings[i]._id, function(listing) {
                        listings.push(listing);
                    });
            }
            $scope.listings = listings;
        }

        /*
         * @param   {int} index     : index of listing to remove
         */
        function removeListing(index) {
            DataService
                .deleteSavedListingById($scope.listings[index]._id, function(listings) {
                   $scope.listings = listings;
                });
            user.savedListings.splice(index,1);
        }

    }

})();