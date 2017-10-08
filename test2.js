var fs = require('fs')
var csv  = require('fast-csv')
var stream = fs.createReadStream("./fraud_data.csv");

var dataArr = {};

var csvStream = csv()
    .on("data", function(data){
         dataArr[data[0]+", "+data[1]] = data[data.length -1];
    })
    .on("end", function(){
         console.log(dataArr);
    });

stream.pipe(csvStream);
