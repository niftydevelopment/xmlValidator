var objectPath = require("object-path");


let validate = (comparison) => {

    comparison.schema.forEach( e => {

        let sourceValue = objectPath.get(comparison.source, e.fromPath);
        let targetValue = objectPath.get(comparison.target, e.toPath);

        if (typeof sourceValue == 'undefined' || typeof targetValue == 'undefined') {
            e.error = "Kunde inte hitta värdet";
            e.result = false;
        } else {
            sourceValue = sourceValue + '';
            targetValue = targetValue + '';

            e.result = sourceValue === targetValue;
            e.expected = sourceValue;
            e.actual = targetValue;
        }
        
    });
    
}

exports.validate = validate;

