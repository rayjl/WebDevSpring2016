'use strict';

// Http Proxy
var http = require('http');

module.exports = function(app, model) {

    // ------------------------------------------------------------------------

    // Add functionality current app
    app.post("/api/project/listing", addSavedListing);
    app.get("/api/project/listing", findAllSavedListings);
    app.get("/api/project/listing/:listingId", findSavedListingById);
    app.delete("/api/project/listing/:listingId", deleteSavedListingById);
    app.get("/rest/data/:address/:citystatezip", zillowFetch);

    // ------------------------------------------------------------------------

    var apiKey = 'X1-ZWz1f5er0e2uiz_2f38x';

    // ------------------------------------------------------------------------

    function zillowFetch(req, res) {
        // Get the params from the body
        var address = req.params.address;
        var citystatezip = req.params.citystatezip;

        // Api url
        var host = 'http://www.zillow.com';
        var path = '/webservice/GetSearchResults.htm?'
            + 'zws-id='
            + apiKey
            + '&address='
            + address
            + '&citystatezip='
            + citystatezip;
        var apiForwardingUrl = host + path;
        console.log(apiForwardingUrl);

        // Callback function for api response
        var callback = function(response) {
            var str= '';
            response.on('data', function(chunk) {
                str += chunk;
            });
            response.on('end', function() {
                res.send(str);
            });
        };
        http.request(apiForwardingUrl, callback).end();
    }

    function addSavedListing(req, res) {
        var listing = req.body;
        model
            .addSavedListing(listing)
            .then(function(listings) {
                res.json(listings);
            });
    }

    function findAllSavedListings(req, res) {
        model
            .findAllSavedListings()
            .then(function(listings) {
                res.json(listings);
            });
    }

    function findSavedListingById(req, res) {
        var listingId = req.params.listingId;
        model
            .findSavedListingById(listingId)
            .then(function(listing) {
                res.json(listing);
            });
    }

    function deleteSavedListingById(req, res) {
        var listingId = req.params.listingId;
        model
            .deleteSavedListingById(listingId)
            .then(function(listings) {
                res.json(listings);
            });
    }

    // ------------------------------------------------------------------------

};