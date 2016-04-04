'use strict';

module.exports = function(mongoose) {
    var fieldSchema = mongoose.Schema(
        {
            label: String,
            type:
            {
                type: String,
                default: "TEXT",
                enum: ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]
            },
            placeholder: String,
            options:
                [
                    {
                        label: String,
                        value: String
                    }
                ]
        });

    return fieldSchema;
};