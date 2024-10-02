const { isRo } = require("../utils/helperFunctions");
const AppSetting = require("./appSettingModel");

exports.getAppSettings = async (req, res) => {
  //private application app settings only
  try {
    const appSettings = await AppSetting.find({ appId: req.body.appId }).select("-appId -_id");
      
    if (!isRo(appSettings)) {
      return res.status(404).send({ title:"App Settings", message: "App settings not found" });
    }

    res.status(200).send({ appSettings });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getPublicSettings = async (req, res) => {
  // return only public facing settings (e.g. companyName)
  try {
    const appSettings = await AppSetting.find({ appId: req.body.appId }).select(
      "companyName -_id"
    );

    if (!isRo(appSettings)) {
      return res.status(404).send({ title: "Public App Settings", message: "Public settings not found" });
    }

    res.status(200).send({ appSettings });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addAppSettings = async (req, res) => {
  try {
    const appSettings = await AppSetting.create(req.body);

    if (!isRo(appSettings)) {
      return res.status(400).send({ title: "App Settings", message: "App settings could not be added" });
    }

    res.status(201).send({ title: "App Settings", message: "App settings were added successfully" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateAppSettings = async (req, res) => {
  try {
    const appSettings = await AppSetting.updateOne({ appId: req.body.appId }, req.body.data);

    if (appSettings.modifiedCount > 0) {
      return res.status(200).send({ title: "App Settings", message: "App settings were updated successfully" });
    }

    res.status(404).send({ title: "App Settings",message: "App settings were not updated" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
