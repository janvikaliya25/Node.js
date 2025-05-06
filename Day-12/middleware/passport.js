const passport=require("passport");
const LocalStrategy = require('passport-local').Strategy;
const  Schema  = require("../modal/fschema");

passport.use("local",new LocalStrategy(
    {usernameField : "email"},
    async (email,password,done)=>{
        let admin=await Schema.findOne({email:email})
        if(admin){
            if(admin.password == password){
                return done(null,admin)
            }
            else{
                return done(null,false)
            }
        }
        else{
            return done(null,false)
        }
    }
))

passport.serializeUser((admin,done)=>{
    return done(null,admin.id)
})

passport.deserializeUser(async(adminId,done)=>{
    let admin = await Schema.findById(adminId);
    if(admin){
        return done(null,admin)
    }else{
        return done(null,false)
    }
})

passport.checkAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.admin=req.user
        next()
    }else{
        res.redirect("/")
    }
}



module.exports=passport;

// const schema=require("mongoose");
// const passport=require("passport");
// const LocalStrategy=require("passport-local").Strategy;

// passport.use("local", new LocalStrategy)(
//     {usernameField : "email"},
//     async (email , password ,done)=>{
//         let admin= await schema.findOne({email:email})
//         if(admin){
            
//         }
//     }
// )