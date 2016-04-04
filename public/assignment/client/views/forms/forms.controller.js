(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var user = $rootScope.user;

        // Execute init to fetch forms if user valid
        if (user) {
            init();
        } else {
            console.log('Login to use.');
        }

        /*
         * This function loads up the forms to the view
         */
        function init() {
            // Fetch all the current forms available from the user
            FormService
                .findAllFormsForUser(user._id)
                .then(function(forms) {
                    $scope.forms = forms;
                });
        }

        /*
         * @param   {string} formName   : form to add
         */
        function addForm(formName) {
            // Create a form variable out of the form name
            var form = {
                title: formName
            };
            // Add form for the user and update the view with the forms
            console.log(user);
            FormService
                .createFormForUser(user._id, form)
                .then(function(form) {
                    console.log('Form created.');
                    FormService
                        .findAllFormsForUser(user._id)
                        .then(function(forms) {
                            $scope.forms = forms;
                        });
                });
        }

        /*
         * @param   {string} formName   : form to update
         */
        function updateForm(formName) {
            // Create a variable out of the form name - add userId field too
            var form = {
                title: formName,
                userId: user._id
            };
            // Update form for the user and update the view
            FormService
                .updateFormById($scope.selectedForm._id, form)
                .then(function(form) {
                    FormService
                        .findAllFormsForUser(user._id)
                        .then(function(forms) {
                            $scope.forms = forms;
                        });
                });
        }

        /*
         * @param   {int} index     : index of the form to delete
         */
        function deleteForm(index) {
            // Delete the selected form and update the view
            FormService
                .deleteFormById($scope.forms[index]._id)
                .then(function(forms) {
                    FormService
                        .findAllFormsForUser(user._id)
                        .then(function(forms) {
                            $scope.forms = forms;
                        });
                });
        }

        /*
         * @param   {int} index     : index of the form selected
         */
        function selectForm(index) {
            // Mark currently selected form and update form with selected one
            $scope.selectedForm = $scope.forms[index];
            $scope.formName = $scope.forms[index].title;
        }

    }

})();
