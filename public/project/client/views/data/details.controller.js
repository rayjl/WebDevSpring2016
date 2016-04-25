(function() {
    'use strict';

    angular
        .module("ZapApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $location, DataService) {
        $scope.removeListing = removeListing;
        var user = $rootScope.user;

        if (user) {
            console.log('Details for user.');
            console.log(user);
            init();
        } else {
            $location.url('/home');
        }

        /*
         * This function inits the page and loads in the saved listings by user
         */
        function init() {
            var listings = [];
            for (var i = 0; i < user.savedListings.length; i++) {
                DataService
                    .findSavedListingById(user.savedListings[i])
                    .then(function(listing) {
                        console.log(listing[0]);
                        listings.push(listing[0]);
                    });
            }
            console.log('Init start.');
            $scope.user = user;
            $scope.listings = listings;
        }

        /*
         * @param   {int} index     : index of listing to remove
         */
        function removeListing(index) {
            DataService
                .deleteSavedListingById($scope.listings[index]._id)
                .then(function(listings) {
                   $scope.listings = listings;
                });
            $scope.user.savedListings.splice(index,1);
        }

    }

})();