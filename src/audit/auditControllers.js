const { isRo } = require("../utils/helperFunctions");
const Audit = require("./auditModel");

exports.getAudits = async (req, res) => {
  try {
    let filter = {};
    if (req.body.filterKey) {
      filter = { [req.body.filterKey]: req.body.filterValue };
    }

    const audit = await Audit.find(filter)
      
    if (!isRo(audit)) {
      return res.status(404).send({ title:"Audit", message: "Audit not found" });
    }

    res.status(200).send({ audit });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addAudit = async (req, res) => {
  try {
    const audit = await Audit.create(req.body);

    if (!isRo(audit)) {
      return res.status(400).send({ title: "Audit", message: "Audit could not be added" });
    }

    res.status(201).send({ title: "Audit", message: "The audit was added successfully" });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
