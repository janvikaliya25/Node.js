
const subCatSchema = require("../modal/subCatSchema")
const catschema = require("../modal/catSchema")
const ProSchema = require("../modal/productSchema")

module.exports.addPro = async (req, res) => {
    await subCatSchema.find({}).then((dat) => {
        console.log(dat);
        
        res.render("addProduct", { dat })
    })
}

module.exports.addProduct = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const image = req.file.path;
    req.body.image = image;
    await ProSchema.create(req.body).then(() => {
        res.redirect("/product/addPro")
    })
}

module.exports.viewProduct = async (req, res) => {
    await ProSchema.find({})
        .populate({
            path: "SubCategoryId",
            populate: {
                path: "categoryId"
            }
        }) 
        .then((dat) => {
            console.log(dat);
            res.render("viewProduct", { dat });
        })
};
