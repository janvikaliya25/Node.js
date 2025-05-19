const { scheduler } = require("timers/promises");
const fSchema = require("../modal/fschema")
const fs = require('fs');
const { Schema } = require("mongoose");
const mailer = require("../middleware/mailer")


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

module.exports.forgotpass=(req,res)=>{
    res.render("forgotpass")
}

module.exports.recoverPass=async(req,res)=>{
    let admin = await fSchema.findOne({email:req.body.email})
    console.log(admin)
    if(!admin){
        return res.redirect("/")
    }

    let otp = Math.floor(Math.random()*100000+900000)
    console.log(otp)
    mailer.sendOTP(req.body.email,otp);
    req.session.otp=otp;
    req.session.adminData=admin;
    res.redirect("/verifypass")
}

module.exports.verify=(req,res)=>{
    res.redirect("vefify")
}


module.exports.verifyPass=async(req,res)=>{
    let otp = req.session.otp;
    let admin = req.session.adminData;
    console.log(otp)
    console.log(admin)

    if(otp == req.body.otp){
        if(req.body.newpass == req.body.confirmpass){
            await fSchema.findByIdAndUpdate(admin._id,{password:req.body.newpass}).then(()=>{
                res.redirect("/")
            })
        }
        else{
            res.redirect("/")
        }
    }
    else{
         res.redirect("/")
    }
}