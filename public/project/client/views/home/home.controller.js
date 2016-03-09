(function() {
    'use strict';

    angular
        .module("ZapApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, DataService) {
        $scope.saveListing = saveListing;
        $scope.executeSearch = executeSearch;
        var user = $rootScope.user;

        if (user) {
            $scope.loggedIn = true;
            $scope.user = user;
        }

        /*
         * This function inits the page - initial search state is false
         */
        (function init() {
            $scope.searchState = false;
        })();

        /*
         * @param   {int} index     : index depicting of listing to add
         */
        function saveListing(index) {
            DataService
                .addSavedListing($scope.listings[index], function(listings) {

                });
        }

        /*
         * @param   {string} searchString   : search input string
         */
        function executeSearch(searchString) {

            console.log(searchString);

            // Check if string is empty
            if (searchString == undefined || searchString.length == 0) {
                $scope.listings = [];
                setSearchState(false);
            } else {
                // Parse search string and create API fetch string



                // API fetch request here
                var newListings = [];



                // Set the search state of the page and the new listings returned
                if (newListings.length > 0) {
                    $scope.listings = newListings;
                    setSearchState(true);
                } else {
                    $scope.listings = [];
                    setSearchState(true);
                }
            }
        }

        /*
         * @param   {bool} state    : sets the search state of the page
         */
        function setSearchState(state) {
            $scope.searchState = state;
        }

    }

})();