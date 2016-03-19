(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FieldEditDialogController", FieldEditDialogController);

    function FieldEditDialogController($scope, FieldService) {
        var formId = $scope.ngDialogData.formId;

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
                            $scope.fields = fields;
                        });
                });
            console.log(formId);
            console.log($scope.fields);
        }
    }

})();