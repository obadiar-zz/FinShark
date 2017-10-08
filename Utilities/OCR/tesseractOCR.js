var Tesseract = require('tesseract.js');

/*
Only input is an image as specified below.

    Image must be:
    1) a path to a local file
    2) a Buffer instance containing a PNG or JPEG image
    3) a ImageData instance (an object containing width, height and data properties)
*/

ImagetoText = (img, keywords, dataAnalysis, callback) => {
  var keywords = keywords || ['loan', 'rate'];
  var dataAnalysis = dataAnalysis || console.log;
  Tesseract.recognize(img, { lang: "eng" })
    .catch(err => console.error(err))
    .then(result => {
      var text = result.text;
      dataAnalysis(text, keywords, callback);
    });
}

module.exports = ImagetoText;
