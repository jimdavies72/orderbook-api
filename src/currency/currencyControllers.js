const fetch = require("node-fetch");
const Currency = require("./currencyModel");

const url = process.env.FCAPI_URL || "";
const apikey = process.env.FCAPI_KEY || "";

//routes: status, currencies, latest, historical

const fetchCurrencyData = async (route, params = "") => {
  return await fetch(`${url}/${route}?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: apikey,
    },
  });
};

exports.getCurrencyData = async (req, res) => {
  try {
    //convert the body object into an & delimited string to pass to the API
    let params = "";
    if (Object.keys(req.body.params).length > 0) {
      const vals = Object.keys(req.body.params).map(
        (key) => [key] + "=" + req.body.params[key]
      );
      params = vals.join("&").replaceAll(" ", "");
    };

    const response = await fetchCurrencyData(req.body.route, params);
    
    const currencyData = await response.json();

    const quotaData = {
      quota: response.headers.get("X-RateLimit-Limit-Quota-Month"),
      remaining: response.headers.get("X-RateLimit-Remaining-Quota-Month"),
    };

    if (response.status != 200) {
      return res.status(response.status).send({
        title: "Currency API response error",
        message: currencyData.message,
      });
    } 

    res.status(response.status).send({ currencyData, quotaData: quotaData });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.getListData = async (req, res) => {
  try {
    const currencyListData = await Currency.findOne();

    if (!currencyListData) {
      return res.status(404).send({ title: "Get list data", message: "List data not found" });
    }

    res.status(200).send({ currencyListData });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.updateListData = async (req, res) => {
  try {
    response = await Currency.updateOne({ _id:req.body.id }, req.body.data );

    if (response.modifiedCount === 0) {
      return res.status(404).send({ title: "Update list data", message: "List data not found" });
    }

    res.status(200).send({ title: "Update list data", message: "List data was updated successfully" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.updateCurrencyData = async (req, res) => {
  try {
    // to do, see route
    res.status(503).send({ title: "Update currency data", message: "Not currently implemented" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.addListData = async (req, res) => {
  try {
    const preflight = await Currency.findOne();
    if (preflight) {
      return res.status(409).send({ title: "Add list data", message: "List data already exists" });
    }

    const response = await fetchCurrencyData("currencies");
    const currencyData = await response.json();

    let currencyList = [];
    for (const [key, value] of Object.entries(currencyData.data)) {
      currencyList.push({
        code: value.code,
        name: value.name,
        symbol: value.symbol,
      });
    }
    
    const listData = await Currency.create({currencyList: currencyList});
    if (!listData) {
      return res.status(response.status).send({ title: "Add list data", message: "List data could not be added" });
    }

    res.status(201).send({ title: "Add list data", message: "List data added successfully" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};