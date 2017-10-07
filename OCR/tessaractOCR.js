var Tesseract = require('tesseract.js');

/*
Only input is an image as specified below.

    Image must be:
    1) a path to a local file
    2) a Buffer instance containing a PNG or JPEG image
    3) a ImageData instance (an object containing width, height and data properties)
*/

detectText = (img, callback) => {
  Tesseract.recognize(img, { lang: "eng" })
    .catch(err => console.error(err))
    .then(result => {
      var text = result.text;
      callback(text);
    });
}

// OCR test
// Specify an image path and then call detectText with that and a callback
/*
  Example
    Input:
    var testImage = __dirname+"/testocr.png"
    detectText(testImage, console.log);


    Output:

    "Aobe Acrobat PDF Files

    Adobe PDF is an ideal formal for eleerronie doeurnenr distribution as il overcomes the

    problems commonly eneounrered wills eleerrenie ﬁle sharing.

    . Anyone. anywhere can open a PDF ﬁles All you need is use free Adnbe Aerobar
    lmdzr. Reclplenls of nLher ﬁle far-mars somenrnes can‘t open fries amuse rbey
    dlyn‘l have Lhe appliearrans used In mm rlae daeurn-rs.

    . PDF ﬁles always printmrrccdy on any priming device.

    . PDF ﬁles always display merry as creamd. regardless of ions, sonware, and
    aperaring syslcms. Fonts, and graphics are nor 105! due la plarron-n saﬁwrre, and
    version incumpatihililics.

    . The free Acrobat Reader is easy to download and can be freely distributed by
    anyone,

    - Compaer PDF ﬁles are smaller than rbair souree ﬂies and download a
    page ar a rime for Lasr display an lhe Web.""

*/

module.exports = detectText;
