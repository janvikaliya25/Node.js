const { Schema } = require("mongoose")
const catSchema = require("../modal/catSchema")

module.exports.addCat = (req, res) => {
    res.render("addCat")
}

module.exports.addCategory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("Image file is required");
        }

        const imagePath = req.file.path;
        req.body.image = imagePath;

        await catSchema.create(req.body);
        res.redirect("/category/addCat");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};


module.exports.viewCat= async(req,res) =>{ 

    await catSchema.find({}).then((data)=>{
        console.log(data)
        res.render("viewCat",{data})
    })
}