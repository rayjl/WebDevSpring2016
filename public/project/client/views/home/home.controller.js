(function() {
    'use strict';

    angular
        .module("ZapApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, DataService) {
        $scope.saveListing = saveListing;
        $scope.setSearchState = setSearchState;
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
         * @param   {bool} state    : sets the search state of the page
         */
        function setSearchState(state) {
            $scope.searchState = state;
        }

    }

})();