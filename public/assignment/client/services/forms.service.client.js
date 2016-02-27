(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        // Default Forms list
        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        // Create a container to return
        var model = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            forms: forms
        };
        return model;

        /*
         * @param   {int} userId    : user id representing user
         * @param   {object} form   : the form to create for the user
         * @param   {func} callback : callback function
         */
        function createFormForUser(userId, form, callback) {
            // Add a unique id to the form
            form._id = (new Date).getTime();

            // Add userId to the form
            form.userId = userId;

            // Push form to local array and callback
            forms.push(form);
            callback(form);
        }

        /*
         * @param   {int} userId    : user id representing user
         * @param   {func} callback : callback function
         */
        function findAllFormsForUser(userId, callback) {
            // Variable for matching forms
            var formsFound =  [];
            // Iterate over array of current forms looking for forms matching userId
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].userId == userId) {
                    formsFound.push(forms[i]);
                }
            }
            // Callback
            callback(formsFound);
        }

        /*
         * @param   {int} formId    : identifier for the form
         * @param   {func} callback : callback function
         */
        function deleteFormById(formId, callback) {
            // Iterate over array of current forms looking for match
            for (var i = 0; i < forms.length; i++) {
                // Remote form from list if found
                if (forms[i]._id == formId) {
                    forms.splice(i,1);
                    break;
                }
            }
            // Callback
            callback(forms);
        }

        /*
         * @param   {int} formId        : identifier for the form
         * @param   {object} newForm    : form to use to update
         * @param   {func} callback     : callback function
         */
        function updateFormById(formId, newForm, callback) {
            // Iterate over array of current forms looking for match
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    newForm._id = formId;
                    forms[i] = newForm;

                    // Callback
                    callback(forms[i]);
                    break;
                }
            }
        }

    }

})();