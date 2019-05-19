const xml2js = require('xml2js');
let fs = require('fs');

var parser = new xml2js.Parser();

var stripPrefix = require('xml2js').processors.stripPrefix;
var normalizeTags = require('xml2js').processors.normalizeTags;
const parseString = require('xml2js').parseString;

let parseXml = (filePath) => {

    return new Promise((res, rej) => {

        let xml = fs.readFileSync(filePath, 'utf8');

        xml2js.parseString(xml,
            {
                explicitArray : false,
                tagNameProcessors: [stripPrefix],
                normalizeTags: true     
            }
            , function (err, result) {
                res(result);
        });
        

    });

}

exports.parseXml = parseXml;