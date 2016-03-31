'use strict';

// Http Proxy
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

module.exports = function(app, model) {

    // ------------------------------------------------------------------------

    // Add functionality current app
    app.post("/api/project/listing", addSavedListing);
    app.get("/api/project/listing", findAllSavedListings);
    app.get("/api/project/listing/:listingId", findSavedListingById);
    app.delete("/api/project/listing/:listingId", deleteSavedListingById);
    app.get("/api/project/data/:address/:citystatezip", zillowFetch);

    // ------------------------------------------------------------------------

    var apiKey = 'X1-ZWz1f5er0e2uiz_2f38x';

    // ------------------------------------------------------------------------

    function zillowFetch(req, res) {
        // Get the params from the body
        var address = req.params.address;
        var citystatezip = req.params.citystatezip;

        // Api url
        //var address = '2114+bigelow+ave';
        //var citystatezip = 'seattle%2C+wa';
        var apiForwardingUrl = 'http://www.zillow.com/webservice/GetSearchResults.htm?'
            + 'zws-id='
            + apiKey
            + '&address='
            + address
            + '&citystatezip='
            + citystatezip;

        console.log(apiForwardingUrl);


        // DEBUG SOMETHING WRONG WITH THIS PROXY CALL - KEEPS APPENDING ON OTHER STUFF TO END

        return apiProxy.web(req, res, {target : apiForwardingUrl});
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