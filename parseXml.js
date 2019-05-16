const Promise = require('promise');
let xml2js = require('xml2js');

const parseString = require('xml2js').parseString;
var parser = new xml2js.Parser({explicitArray : false});

let parseXml = (xml) => {

    return new Promise((res, rej) => {

        parser.parseString(xml, function (err, result) {
            console.dir(result);
            res(result);
        }); 

    });   

}


exports.parseXml = parseXml;
