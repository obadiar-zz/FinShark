var DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1');
var fs = require('fs');

var document_conversion = new DocumentConversionV1({
    username: process.env.PDF2TEXTUSER,
    password: process.env.PDF2TEXTPASS,
    version_date: '2015-12-01'
});

var inputFolder = './resources/';
var outputFolder = './converted/';
var fileName = process.argv[2] || 'pdf-sample';
var inputExt = '.pdf'
var outputExt = '.txt'

// convert a single document
document_conversion.convert({
    // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
    file: fs.createReadStream(inputFolder + fileName + inputExt),
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
        // fs.writeFileSync(outputFolder + fileName + '.txt', JSON.stringify(response, null, 2))
        fs.writeFile()
        fs.writeFile(outputFolder + fileName + '.txt', response, (success) => {
            console.log('File converted successfully.')
        })
    }
}));