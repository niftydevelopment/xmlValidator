let fs = require('fs');
var objectPath = require("object-path");

let parseSchema = require('./parseSchema');
let parseXml = require('./parseXml');



parseSchema.parse('./resources/schema.txt').then(schema => {

    let resultat;

    parseXml.parseXml(fs.readFileSync('./resources/test.xml')).then(xml => {

        resultat = JSON.parse(fs.readFileSync('./resources/resultat.json', 'utf8'));
    
        schema.forEach( e => {
            let source = objectPath.get(xml, e.from);
            let target = objectPath.get(resultat, e.to);

            if (!source || !target) {
                e.error = "Kunde inte hitta värdet";
            } else {
                source = source + '';
                target = target + '';
            }

            e.result = source === target;
            e.expected = source;
            e.actual = target;
            
        });

        console.log(schema);
    });
    
});


