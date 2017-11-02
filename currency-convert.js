// USD --> CAD
const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];

    // Make error checking work if both/just one of the arguments is invalid
    if (rate) {
      return rate;
    } else {
      // Trigger the catch block
      throw new Error();
    }
  } catch (err) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async currencyCode => {
  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${currencyCode}`
    );
    // Figure out all countries that support the currency, then return an array--not of objects but strings
    return response.data.map(country => country.name);
  } catch (err) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};

// getExchangeRate('USD', 'EUR').then(rate => {
//   console.log(rate);
// });

// getCountries('CAD').then(countries => {
//   console.log(countries);
// });

// const convertCurrency = (from, to, amount) => {
//   let countries;
//   return getCountries(to)
//     .then(tempCountries => {
//       countries = tempCountries;
//       return getExchangeRate(from, to);
//     })
//     .then(rate => {
//       const exchangedAmount = amount * rate;
//
//       return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
//         ', '
//       )}`;
//     });
// };

// convertCurrency('CAD', 'USD', 100).then(status => {
//   console.log(status);
// });

// Use Async/Await syntax instead
const convertCurrencyAlt = async (from, to, amount) => {
  // // Instead of the serial approach
  // const countries = await getCountries(to);
  // const rate = await getExchangeRate(from, to);
  // use Promise.all() to send out those requests concurrently
  const [countries, rate] = await Promise.all([
    getCountries(to),
    getExchangeRate(from, to)
  ]);

  const exchangedAmount = amount * rate;

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
    ', '
  )}`;
};

convertCurrencyAlt('MMM', 'EUR', 100)
  .then(status => {
    console.log(status);
  })
  .catch(err => {
    console.log(err.message);
  });
