(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FieldEditDialogController", FieldEditDialogController);

    function FieldEditDialogController($scope, FieldService, $location) {
        var formId = $scope.ngDialogData.formId;
        var pageScope = $scope.ngDialogData.pageScope;

        $scope.field = $scope.ngDialogData.field;
        $scope.fieldTypes = $scope.ngDialogData.fieldTypes;

        $scope.saveField = saveField;

        function saveField(fieldId, updatedField) {
            FieldService
                .updateField(formId, fieldId, updatedField)
                .then(function(fields) {
                    FieldService
                        .getFieldsForForm(formId)
                        .then(function(fields) {
                            pageScope.fields = fields;
                        });
                });
        }
    }

})();