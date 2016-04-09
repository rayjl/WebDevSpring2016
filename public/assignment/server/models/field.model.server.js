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
        var form = FormModel.findFormById(formId);
        defer.resolve(form.fields);
        return defer.promise;
    }

    function findFieldById(formId, fieldId) {
        var defer = q.defer();
        var form = FormModel.findFormById(formId);
        var fields = form.fields;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i]._id == fieldId) {
                defer.resolve(fields[i]);
            }
        }
        return defer.promise;
    }

    function deleteField(formId, fieldId) {
        var defer = q.defer();
        var form = FormModel.findFormById(formId);
        var fields = form.fields;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i]._id == fieldId) {
                fields.splice(i, 1);
                form = FormModel.updateForm(formId, form);
                defer.resolve(form);
            }
        }
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
        console.log(formId);
        var form = FormModel.findFormById(formId);

        console.log("Form fetched. Creating new field.");

        if (!form.fields) {
            form.fields = [];
        }
        form.fields.push(fieldObj);
        console.log(fieldObj + " pushed.");

        form = FormModel.updateForm(formId, form);
        defer.resolve(form);
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
        var form = FormModel.findFormById(formId);
        var fields = form.fields;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i]._id == fieldId) {
                fields[i].label = fieldObj.label;
                fields[i].placeholder = fieldObj.placeholder;
                fields[i].options = newOptions;
                form = FormModel.updateForm(formId, form);
                defer.resolve(form);
            }
        }
        return defer.promise;
    }

    function updateAllFields(formId, fields) {
        var defer = q.defer();
        var form = FormModel.findFormById(formId);
        form.fields = fields;
        form = FormModel.updateForm(formId, form);
        defer.resolve(form.fields);
        return defer.promise;
    }

};