var fs = require('fs')
var csv  = require('fast-csv')
var stream = fs.createReadStream("./fraud_data.csv");


getFraudData = (callback) => {
  var dataArr = {};

  var csvStream = csv()
      .on("data", function(data){
           dataArr[data[0]] = data[data.length -1]
      })
      .on("end", function(){
          callback(dataArr);
      });

  stream.pipe(csvStream);
}

module.exports = getFraudData;
