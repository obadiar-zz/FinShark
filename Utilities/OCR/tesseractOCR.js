var Tesseract = require('tesseract.js');
var path = require('path')

/*
Only input is an image as specified below.

    Image must be:
    1) a path to a local file
    2) a Buffer instance containing a PNG or JPEG image
    3) a ImageData instance (an object containing width, height and data properties)
*/

ImagetoText = (img, callback) => {
  var img = path.join(__dirname, '..', 'resources', img);
  Tesseract.recognize(img, { lang: "eng" })
    .catch(err => console.error(err))
    .then(result => {
      var text = result.text;
      callback(text);
    });
}

module.exports = ImagetoText;
