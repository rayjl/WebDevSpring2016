(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        // --------------------------------------------------------------------

        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return service;

        // --------------------------------------------------------------------

        function createFieldForForm(formId, field) {
            var defer = $q.defer();
            $http
                .post("/api/assignment/form/" + formId + "/field", field)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function getFieldsForForm(formId) {
            var defer = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field")
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var defer = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var defer = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateField(formId, fieldId, field) {
            var defer = $q.defer();
            $http
                .put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

    }

})();