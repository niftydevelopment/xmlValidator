let fs = require('fs');

let parseSchema = require('./parseSchema');
let parseXml = require('./parseXml');
let validation = require('./validation');

let comparison = {
    schema: null,
    result: null,
    source: null
}

parseSchema.parse('./resources/schema.txt').then(result => {
    comparison.schema = result;
    return parseXml.parseXml('./resources/test.xml');
}).then(target => {
    comparison.target = target;
    comparison.source = JSON.parse(fs.readFileSync('./resources/mq.json', 'utf8'));

    validation.validate(comparison);

    let x = comparison.schema.filter(e => e.result);

    console.log('--->', x);

});
