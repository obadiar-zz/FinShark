var PDFImage = require("pdf-image").PDFImage;
var fs = require("fs");

function PDFtoImage(fileName, callback) {
    var pdfImage = new PDFImage(__dirname + '/resources/' + fileName);
    pdfImage.outputDirectory = __dirname + '/resources/converted/'
    pdfImage.convertPage(0)
        .then((imagePath) => {
            console.log("PDF converted to Image.");
            callback(imagePath)
        }, (err) => {
            console.log(err);
        });
}

module.exports = PDFtoImage