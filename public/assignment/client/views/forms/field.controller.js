(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService, FormService, ngDialog) {
        $scope.addField = addField;
        $scope.deleteField = deleteField;
        $scope.editField = editField;
        $scope.copyField = copyField;

        // Use $routeParams to extract out the user and form id
        var userId = $routeParams["userId"];
        var formId = $routeParams["formId"];

        // Field type variable added to scope
        $scope.fieldTypes = [
            { value: "TEXT", text: "Single Line Text Field" },
            { value: "TEXTAREA", text: "Multi Line Text Field" },
            { value: "DATE", text: "Date Field" },
            { value: "OPTIONS", text: "Dropdown Field" },
            { value: "CHECKBOXES", text: "Checkboxes Field" },
            { value: "RADIOS", text: "Radio Buttons Field" },
            { value: "EMAIL", text: "Email Field"}
        ];

        // --------------------------------------------------------------------

        init();
        function init() {
            // Fetch for form
            FormService
                .findFormById(formId)
                .then(function(form) {
                    $scope.form = form;
                });
            // Fetch the field for the current form
            FieldService
                .getFieldsForForm(formId)
                .then(function(fields) {
                    $scope.fields = fields;
                });
        }

        // --------------------------------------------------------------------

        function addField(fieldType) {
            var newField = {
                "type": fieldType
            };

            // Check the type of field to add
            if (fieldType == "TEXT" || fieldType == "TEXTAREA") {
                newField.label = "New Text Field";
                newField.placeholder = "New Field";

            } else if (fieldType == "DATE") {
                newField.label = "New Date Field";

            } else if (fieldType == "OPTIONS") {
                newField.label = "New Dropdown";
                newField.options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];

            } else if (fieldType == "CHECKBOXES") {
                newField.label = "New Checkboxes";
                newField.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];

            } else if (fieldType == "RADIOS") {
                newField.label = "New Radio Buttons";
                newField.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];

            } else if (fieldType == "EMAIL") {
                newField.label = "New Email";
                newField.placeholder = "New Email";

            } else { // Text field if unsupported as default
                newField.type = "TEXT";
                newField.label = "New Unknown Field";
                newField.placeholder = "New unknown field";
            }

            FieldService
                .createFieldForForm(formId, newField)
                .then(function(field) {
                    FieldService
                        .getFieldsForForm(formId)
                        .then(function(fields) {
                            $scope.fields = fields;
                        });
                });
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function(field) {
                    FieldService
                        .getFieldsForForm(formId)
                        .then(function(fields) {
                            $scope.fields = fields;
                        });
                });
        }

        function editField(field) {
            ngDialog.open({
                template: "./views/forms/fieldEditDialog.view.html",
                controller: "FieldEditDialogController",
                data: {
                    pageScope : $scope,
                    formId : formId,
                    field : field,
                    fieldTypes : $scope.fieldTypes
                }
            });
        }

        function copyField(field) {
            FieldService
                .createFieldForForm(formId, field)
                .then(function(fields) {
                    FieldService
                        .getFieldsForForm(formId)
                        .then(function(fields) {
                            $scope.fields = fields;
                        });
                });
        }

    }

})();