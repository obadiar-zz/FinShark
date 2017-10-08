var DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1');
var fs = require('fs');
var path = require('path')

var document_conversion = new DocumentConversionV1({
    username: process.env.PDF2TEXTUSER,
    password: process.env.PDF2TEXTPASS,
    version_date: '2015-12-01'
});

/*
This function takes two parameters:
1) A PDF's file name to be converted to text
2) A callback function to decide what to do with the resulting text
*/

function PDFtoText(fileName, callback) {
    var inputFolder = path.join(__dirname, '..', 'resources/')
    var outputFolder = __dirname + '/converted/';
    var inputPath = inputFolder + fileName;
    var outputPath = outputFolder + fileName.substring(0, fileName.indexOf('.')) + '.txt';
    document_conversion.convert({
        // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
        file: fs.createReadStream(inputPath),
        // conversion_target: document_conversion.conversion_target.ANSWER_UNITS,
        conversion_target: document_conversion.conversion_target.NORMALIZED_TEXT,
        // Add custom configuration properties or omit for defaults
        word: {
            heading: {
                fonts: [
                    { level: 1, min_size: 24 },
                    { level: 2, min_size: 16, max_size: 24 }
                ]
            }
        }
    }, ((error, response) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('PDF converted successfully.')
            callback(response)
            // callback(JSON.stringify(response, null, 4));
        }
    }));
}

module.exports = PDFtoText