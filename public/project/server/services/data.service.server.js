'use strict';

module.exports = function(app, model) {

    // ------------------------------------------------------------------------

    // Add functionality current app
    app.post("/api/project/listing", addSavedListing);
    app.get("/api/project/listing", findAllSavedListings);
    app.get("/api/project/listing/:listingId", findSavedListingById);
    app.delete("/api/project/listing/:listingId", deleteSavedListingById);

    // ------------------------------------------------------------------------

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