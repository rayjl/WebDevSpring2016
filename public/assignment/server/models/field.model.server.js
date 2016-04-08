'use strict';
var q = require('q');

module.exports = function(mongoose, FormModel) {

    // ------------------------------------------------------------------------

    // Mongoose and MongoDB used
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model("FieldModel", FieldSchema);

    // ------------------------------------------------------------------------

    var api = {
        findAllFields: findAllFields,
        findFieldById: findFieldById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField,
        updateAllFields: updateAllFields
    };
    return api;

    // ------------------------------------------------------------------------

    function findAllFields(formId) {
        var defer = q.defer();
        FormModel
            .findFormById({_id: formId}, function(err, form) {
                defer.resolve(form.fields);
            });
        return defer.promise;
    }

    function findFieldById(formId, fieldId) {
        var defer = q.defer();
        FormModel
            .findFormById({_id: formId}, function(err, form) {
                var fields = form.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {
                        defer.resolve(fields[i]);
                    }
                }
            });
        return defer.promise;
    }

    function deleteField(formId, fieldId) {
        var defer = q.defer();
        FormModel
            .findFormById({_id: formId}, function(err, form) {
                var fields = form.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {
                        fields.splice(i, 1);
                        form.save(function(err, form) {
                            defer.resolve(form);
                        });
                    }
                }
            });
        return defer.promise;
    }

    function createField(formId, fieldObj) {
        var defer = q.defer();
        delete fieldObj._id;
        if (fieldObj.options) {
            for (var i = 0; i < fieldObj.options.length; i++) {
                delete fieldObj.options[i]._id;
            }
        }
        console.log("Creating new field for form " + formId);
        FormModel
            .findFormById({_id: formId}, function(err, form) {
                console.log(form);
                form.fields.push(fieldObj);
                form.save(function(err, form) {
                    defer.resolve(form);
                });
            });
        return defer.promise;
    }

    function updateField(formId, fieldId, fieldObj) {
        var defer = q.defer();
        if (fieldObj.options) {
            var options = fieldObj.options.split("\n");
            var newOptions = [];
            for (var i = 0; i < options.length; i++) {
                var label = options[i].split(",")[0];
                var value = options[i].split(",")[1];
                newOptions.push({label: label, value: value});
            }
        }
        FormModel
            .findFormById({_id: formId}, function(err, form) {
                var fields = form.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {
                        fields[i].label = fieldObj.label;
                        fields[i].placeholder = fieldObj.placeholder;
                        fields[i].options = newOptions;
                        form.save(function(err, form) {
                            defer.resolve(form);
                        });
                    }
                }
            });
        return defer.promise;
    }

    function updateAllFields(formId, fields) {
        var defer = q.defer();
        FormModel
            .findFormById({_id: formId}, function(err, form) {
                form.fields = fields;
                form.save(function(err, form) {
                    defer.resolve(form.fields);
                });
            });
        return defer.promise;
    }

};