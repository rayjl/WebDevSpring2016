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
                .addSavedListing($scope.listings[index])
                .then(function(listings) {
                    console.log(listings);
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

                // Check that the search string is valid format
                var arr = searchString.split(',');
                if (arr.length < 3) {
                    alert('Please enter an address, city, state and zip to search.');

                } else {

                    // address
                    var address = arr[0].trim().split(' ').join('+');

                    // citystatezip
                    var city = arr[1].trim() + '%2C';
                    var statezip = arr[2].trim();
                    var citystatezip = city + '+' + statezip.split(' ').join('+');

                    // Data Fetch
                    DataService
                        .zillowFetch(address, citystatezip)
                        .then(function (results) {

                            // Fetched results in XML format
                            var xmlResults = results;
                            console.log(xmlResults);

                            // Convert data to JSON format
                            var jsonResults = $.xml2json(xmlResults);
                            console.log(jsonResults);

                            // Add fetched data to new listing
                            var newListingsRaw = jsonResults.response.results.result;

                            // Iterate through and create listing objects
                            var knownListings = {};
                            var newListings = [];
                            var runnerIdx = 0;
                            for (var i = 0; i < newListingsRaw.length; i++) {
                                var rawListing = newListingsRaw[i];
                                console.log(rawListing);

                                var rawListingAddress = rawListing.address;
                                var rawZestimate = rawListing.zestimate;
                                var rawLinks = rawListing.links;

                                if (knownListings[rawListingAddress.street]) {
                                    continue;
                                }

                                var amount = rawZestimate.amount.text;
                                if (amount) {
                                    newListings[runnerIdx] = {
                                        "street": rawListingAddress.street,
                                        "city": rawListingAddress.city,
                                        "state": rawListingAddress.state,
                                        "zestimate": '$' + rawZestimate.amount.text,
                                        "details": rawLinks.homedetails
                                    };
                                    runnerIdx++;
                                }

                            }

                            // Set the search state of the page and the new listings returned
                            if (newListings.length > 0) {
                                $scope.listings = newListings;
                                setSearchState(true);
                            } else {
                                $scope.listings = [];
                                setSearchState(true);
                            }

                        });
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