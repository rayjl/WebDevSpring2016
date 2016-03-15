(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        // --------------------------------------------------------------------

        // Create a container to return
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        // --------------------------------------------------------------------

        function createFormForUser(userId, form) {
            var defer = $q.defer();
            $http
                .post("/api/assignment/user/" + userId + "/form", form)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllFormsForUser(userId) {
            var defer = $q.defer();
            $http
                .get("/api/assignment/user/" + userId + "/form")
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteFormById(formId) {
            var defer = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateFormById(formId, newForm) {
            var defer = $q.defer();
            $http
                .put("/api/assignment/form/" + formId, newForm)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

    }

})();