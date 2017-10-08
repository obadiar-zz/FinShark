var axios = require('axios')

const MORTGAGE_RATES_URL = 'https://uat-publicrestservice.usbank.com/public/RatesRestService_V_6_0/GetMortgageRates?application=myapp&output=json'

function getMortgageRates(loanTerm, loanType, callback) {
    axios.get(MORTGAGE_RATES_URL)
        .then(function (response) {
            var mortgageRates = response.data.MortgageRatesList.MortgageRates
            var convertedTerm = parseInt(loanTerm) / 12
            for (var i in mortgageRates) {
                var rateProductType = mortgageRates[i].RateProductType
                if (rateProductType.indexOf(loanType) !== -1 && rateProductType.indexOf('' + convertedTerm + (loanType === 'ARM' ? 'YR' : '')) !== -1) {
                    callback(mortgageRates[i]);
                    break;
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = getMortgageRates