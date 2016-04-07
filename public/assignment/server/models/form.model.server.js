'use strict';
var q = require('q');

module.exports = function(mongoose) {

    // ------------------------------------------------------------------------

    // Mongoose and MongoDB used
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);

    // ------------------------------------------------------------------------

    var api = {
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormsByUserId: findFormsByUserId
    };
    return api;

    // ------------------------------------------------------------------------

    function createFormForUser(formObj) {
        var defer = q.defer();
        FormModel
            .create(formObj, function(err, form) {
                if (err) {
                    defer.reject(err);
                }
            });
        var forms = findFormsByUserId(formObj.userId);
        console.log(forms);
        defer.resolve(forms);
        return defer.promise;
    }

    function findAllForms() {
        var defer = q.defer();
        FormModel
            .find(function(err, forms) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(forms);
                }
            });
        return defer.promise;
    }

    function findFormById(formId) {
        var defer = q.defer();
        FormModel
            .find({_id: formId}, function(err, form) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(form);
                }
            });
        return defer.promise;
    }

    function updateForm(formId, formObj) {
        var defer = q.defer();
        delete formObj._id;
        FormModel
            .update({_id: formId}, {$set: formObj}, function(err, form) {
                if (err) {
                    defer.reject(err);
                }
            });
        var forms = findFormsByUserId(formObj.userId);
        console.log(forms);
        defer.resolve(forms);
        return defer.promise;
    }

    function deleteForm(formId) {
        var defer = q.defer();
        FormModel
            .remove({_id: formId}, function(err, form) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(form);
                }
            });
        return defer.promise;
    }

    function findFormByTitle(userId, title) {
        var defer = q.defer();
        FormModel
            .find({userId: userId, title: title}, function(err, form) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(form);
                }
            });
        return defer.promise;
    }

    function findFormsByUserId(userId) {
        var defer = q.defer();
        console.log("Finding forms by user.");
        FormModel
            .find({userId: userId}, function(err, forms) {
                console.log(err);
                console.log(forms);
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(forms);
                }
            });
        return defer.promise;
    }

};