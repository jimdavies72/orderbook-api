const AppSetting = require("./appSettingModel");

exports.getAppSettings = async (req, res) => {
  try {
    const appSettings = await AppSetting.find({appId: req.body.appId}).select("-appId -_id");
      
    if (!appSettings) {
      res.status(404).send({ title:"Get App Settings", message: "No app settings found" });
      return;
    }

    res.status(200).send({ appSettings });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addAppSettings = async (req, res) => {
  try {
    const appsettings = await AppSetting.create(req.body);

    if (!appsettings) {
      return res
        .status(404)
        .send({ title: "Add App Settings", message: "App settings could not be added" });
    }

    res.status(201).send({
      title: "Add App Settings",
      message: "The app settings were added successfully",
    });

  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error.message)
  }
};

exports.updateAppSettings = async (req, res) => {
  try {
    const appSetting = await AppSetting.updateOne(
      { appId: req.body.appId },
      req.body.data
    );

    if (appSetting.modifiedCount > 0) {
      return res.status(200).send({
        title: "Update App Settings",
        message: "App settings were updated successfully",
      });
    }

    res.status(404).send({
      title: "Something went wrong",
      message: "App settings were not updated",
    });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
