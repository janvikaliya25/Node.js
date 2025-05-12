const { scheduler } = require("timers/promises");
const fSchema = require("../modal/fschema")
const fs = require('fs');
const { Schema } = require("mongoose");


module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.profile = (req, res) => {
    res.render("profile")
}

module.exports.loginadmin = async (req, res) => {
    req.flash("success","Login Successfull...!")
    res.redirect("/dashboard")
}

module.exports.logout = (req, res) => {
    res.redirect("/")
}

module.exports.dashboard = (req, res) => {
    res.render("dashboard")
}

module.exports.addAdmin = (req, res) => {
    res.render("addAdmin")
}

module.exports.addAdmin = (req, res) => {
    res.render("addAdmin");
}

module.exports.viewAdmin = async (req, res) => {
    await fSchema.find({}).then((data) => {
        res.render("table", { data });
    })

}

module.exports.add = async (req, res) => {
    req.body.profile = req.file.path;

    await fSchema.create(req.body).then(() => {
        res.redirect('/table');
    })
}


module.exports.delete = async (req, res) => {
    let singleData = await fSchema.findById(req.query.id);
    fs.unlinkSync(singleData.profile)
    await fSchema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/table");
    })
}

module.exports.edit = async (req, res) => {
    let data = await fSchema.findById(req.query.id);
    res.render("edit", { data })
}


module.exports.update = async (req, res) => {
    let singleData = await fSchema.findById(req.body.id);
    let img = ""

    req.file ? img = req.file.path : img = singleData.profile;
    req.file && fs.unlinkSync(singleData.profile)

    req.body.profile = img;
    await fSchema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/table")
    })
}

module.exports.changepassword=(req,res)=>{
    res.render("changepassword")
}

module.exports.changePass=async(req,res)=>{
    let admin=req.user;
    console.log(admin)
    if(admin.password == req.body.oldpass){
        if(req.body.oldpass != req.body.newpass){
            if(req.body.newpass == req.body.confirmpass){
                await fSchema.findByIdAndUpdate(admin.id,{password:req.body.newpass}).then(()=>{
                    res.redirect("/logout");
                })
            }
            else{
                // req.flash("err","New password and confirm password has to be same !")
                res.redirect("/changepassword")
            }
        } 
        else{
            res.redirect("/changepassword")
        }
    }
    else{
        res.redirect("/changepassword")
    }
} 