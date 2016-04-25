(function() {
    'use strict';

    angular
        .module("ZapApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $location, UserService, DataService) {
        $scope.removeListing = removeListing;
        var user = $rootScope.user;

        if (user) {
            console.log('Details page user.');
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
            console.log($scope.user.savedListings);
            for (var i = 0; i < $scope.user.savedListings.length; i++) {
                DataService
                    .findSavedListingById($scope.user.savedListings[i])
                    .then(function(listing) {
                        console.log(listing[0]);
                        listings.push(listing[0]);
                    });
            }
            console.log('Details page init start.');
            $scope.user = $rootScope.user;
            $scope.listings = listings;
        }

        /*
         * @param   {int} index     : index of listing to remove
         */
        function removeListing(index) {
            $scope.user.savedListings.splice(index,1);
            UserService
                .updateUser($scope.user._id, $scope.user)
                .then(function(user) {
                    console.log('Listing removed. User updated.');
                    $rootScope.user = user;
                    init();
                });
        }

    }

})();