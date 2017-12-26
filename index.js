const request = require('request-promise');

const test = async function() {
  let lastPrices = [];
  
  const markets = await request({
    uri: 'https://bittrex.com/api/v1.1/public/getmarkets',
    json: true,
  });

  for (let i = 0; i < 5; i++) {
    const tick = await request({
      uri: 'https://bittrex.com/api/v1.1/public/getticker',
      qs: {
        market: markets['result'][i]['MarketName'],
      },
      json: true,
    });
    lastPrices.push(tick['result']['Last']);
  }

  return lastPrices;
}

test().then((res) => {
  console.log(res);
});
