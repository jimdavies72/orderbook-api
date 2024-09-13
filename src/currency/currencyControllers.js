const fetch = require("node-fetch");

const url = "https://api.freecurrencyapi.com/v1";
const apikey = process.env.FCAPI_KEY;

//routes: status, currencies, latest, historical

exports.getCurrencyData = async (req, res) => {
  try {
    const reqParams = {...req.query};
    delete reqParams.route;
    let params = "";
    if (Object.keys(reqParams).length > 0) {
      const vals = Object.keys(reqParams).map(
        (key) => [key] + "=" + reqParams[key]
      );
      params = vals.join("&")
    } 

    const response = await fetch(`${url}/${req.query.route}?${params}`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'apikey': apikey
        }
      }
    );

    const currencyData = await response.json();
    const quotaData = {
      quota: response.headers.get("X-RateLimit-Limit-Quota-Month"),
      remaining: response.headers.get("X-RateLimit-Remaining-Quota-Month"),
    };

    if (response.status != 200) {
      return res.status(response.status).send({
        title: "Currency Data",
        message: currencyData.message,
      });
    } 

    res.status(response.status).send({ currencyData, quotaData: quotaData });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
