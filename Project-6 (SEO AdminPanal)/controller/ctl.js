

const schema = require("../model/schema");

module.exports.dashboard = (req, res) => {
    res.render("dashboard");
};

module.exports.registerAdmin = (req, res) => {
    res.render("registerAdmin");
};

module.exports.viewAdmin = async (req, res) => {
    try {
        const dat = await schema.find({});
        res.render("viewAdmin", { dat });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading admin data");
    }
};

module.exports.addAdmin = async (req, res) => {
    console.log("Submitted form data:", req.body); 
    try {
        await schema.create(req.body);
        res.redirect("/viewAdmin");
    } catch (err) {
        console.error("Validation error:", err.message);
    }
};


module.exports.delete = async (req, res) => {
    try {
        console.log(req.body.id);
        await schema.findByIdAndDelete(req.body.id);
        res.redirect("/viewAdmin");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting admin");
    }
};

module.exports.edit = async (req, res) => {
    try {
        const dat = await schema.findById(req.body.id);
        res.render("update", { dat });  
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading edit form");
    }
};

module.exports.update = async (req, res) => {
    try {
        await schema.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/viewAdmin");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating admin");
    }
};
