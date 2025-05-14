const catSchema = require("../modal/catSchema")

module.exports.addCat = (req, res) => {
    res.render("addCat")
}

module.exports.addCategory = (req, res) => {
    console.log(req.body)

}