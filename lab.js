const fs = require('fs');
const xml2js = require('xml2js');
var parser = new xml2js.Parser();
var stripPrefix = require('xml2js').processors.stripPrefix;
var normalizeTags = require('xml2js').processors.normalizeTags;
const parseString = require('xml2js').parseString;

productXML = fs.readFileSync('./resources/test.xml', 'utf8');

xml2js.parseString(productXML,
    {
        explicitArray : false,
        tagNameProcessors: [stripPrefix],
        normalizeTags: true     
    }
    , function (err, result) {
        // console.dir will allow us to print the whole object in our console
        console.log(result); // Output: { Product: { ID: '10', Name: 'Pizza' } }
});