'use strict';
var q = require('q');

module.exports = function() {

    var forms = require('./form.mock.json');

    var api = {
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormsByUserId: findFormsByUserId,
        findAllFields: findAllFields,
        findFieldById: findFieldById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    };
    return api;

    function createFormForUser(formObj) {
        var defer = q.defer();
        forms.push(formObj);
        defer.resolve(forms);
        return defer.promise;
    }

    function findAllForms() {
        var defer = q.defer();
        defer.resolve(forms);
        return defer.promise;
    }

    function findFormById(formId) {
        var defer = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                defer.resolve(forms[i]);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function updateForm(formId, formObj) {
        var defer = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms[i].title = formObj.title;
                forms[i].userId = formObj.userId;
                forms[i].fields = formObj.fields;
                defer.resolve(forms);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function deleteForm(formId) {
        var defer = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms.splice(i,1);
                defer.resolve(forms);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function findFormByTitle(title) {
        var defer = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title) {
                defer.resolve(forms[i]);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function findFormsByUserId(userId) {
        var defer = q.defer();
        var userForms = [];
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].userId == userId) {
                userForms.push(forms[i]);
            }
        }
        defer.resolve(userForms);
        return defer.promise;
    }

    function findAllFields(formId) {
        var defer = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                defer.resolve(forms[i].fields);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function findFieldById(formId, fieldId) {
        var defer = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                for (var j = 0; j < forms[i].fields.length; j++) {
                    if (forms[i].fields[j]._id == fieldId) {
                        defer.resolve(forms[i].fields[j]);
                        return defer.promise;
                    }
                }
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function deleteField(formId, fieldId) {
        var defer = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                for (var j = 0; j < forms[i].fields.length; j++) {
                    if (forms[i].fields[j]._id == fieldId) {
                        forms[i].fields.splice(j,1);
                        defer.resolve(forms[i].fields);
                        return defer.promise;
                    }
                }
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function createField(formId, fieldObj) {
        var defer = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms[i].fields.push(fieldObj);
                defer.resolve(forms[i].fields);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function updateField(formId, fieldId, fieldObj) {
        var defer = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                for (var j = 0; j < forms[i].fields.length; j++) {
                    if (forms[i].fields[j]._id == fieldId) {
                        if (fieldObj.label) {
                            forms[i].fields[j].label = fieldObj.label;
                        }
                        if (fieldObj.type) {
                            forms[i].fields[j].type = fieldObj.type;
                        }
                        if (fieldObj.placeholder) {
                            forms[i].fields[j].placeholder = fieldObj.placeholder;
                        }
                        if (fieldObj.options) {
                            forms[i].fields[j].options = fieldObj.options;
                        }
                        defer.resolve(forms[i].fields);
                        return defer.promise;
                    }
                }
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

};