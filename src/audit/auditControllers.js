const Audit = require("./auditModel");

exports.getAudits = async (req, res) => {
  try {
    let filter = {};
    if (req.body.filterKey) {
      filter = { [req.body.filterKey]: req.body.filterValue };
    }

    const audits = await Audit.find(filter)
      
    if (!audits) {
      res.status(404).send({ title:"Get Audit", message: "Audit not found" });
      return;
    }

    res.status(200).send({ audits });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addAudit = async (req, res) => {
  try {
    const audit = await Audit.create(req.body);

    if (!audit) {
      return res
        .status(404)
        .send({ title: "Add Audit", message: "Audit could not be added" });
    }

    res.status(201).send({
      title: "Add Audit",
      message: "The audit was added successfully",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
