const Promise = require('promise');

var fs = require('fs')
    , es = require('event-stream');


let parse = (filePath) => {

    return new Promise((res, rej) => {

        let schema = [];
        let lineinSchema = 0;

        var s = fs.createReadStream(filePath)
            .pipe(es.split())
            .pipe(es.mapSync(function (line) {
                let s_t = line.split('->');

                let matchDesc = {
                    'lineinSchema': lineinSchema++,
                    'error': false,
                    'errorDesc': null,
                    'fromPath': s_t[0],
                    'toPath': s_t[1]
                }

                let dups = schema.find(e => {
                    return e.from == s_t[0] || e.to == s_t[1];
                });
    
                if (dups) {
                    matchDesc.error = true;
                    matchDesc.errorDesc = "Hittade en duplicerad rad.";
                }
    
                schema.push(matchDesc);
            })
                .on('error', function (err) {
                    rej(err);
                })
                .on('end', function () {
                    res(schema);
                })
            );




    });
}


exports.parse = parse;