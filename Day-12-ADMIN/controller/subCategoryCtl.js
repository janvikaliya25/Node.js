
const subCatSchema = require("../modal/subCatSchema")
const catschema = require("../modal/catSchema")

module.exports.addSubCategory = async (req, res) => {
    await catschema.find({})
        .then((dat) => {
            res.render("addSubCategory", { dat })
        })
}

module.exports.addSubCat = async (req, res) => {
    console.log(req.body)

    await subCatSchema.create(req.body)
    .then(()=>{
        res.redirect("/subCategory/addSubCategory")
    })
}

module.exports.viewSubCategory = async(req,res)=>{
    await subCatSchema.find({})
    .populate("categoryId")
    .then((dat)=>{
        res.render("viewSubCategory",{dat})
    })
}
