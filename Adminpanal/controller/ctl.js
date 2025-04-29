
const schema = require('../model/schema');

// module.exports.login=(req,res)=>{
//     res.render("login")
// }

// module.exports.loginpage=async(req,res)=>{
//     console.log(req.body);
//     let admin= await schema.findOne({email:req.body.email});

//     if(admin){
//         if(req.body.password == admin.password){
//             res.cookie("admin",admin)

//             res.redirect("/index")
//         }
//         else{
//             res.redirect("/")
//         }
//     }
//     else{
//         res.redirect("/")
//     }
// }
// module.exports.indexpage=(req,res)=>{
//     res.render("index")
//     // if(req.cookies.admin){
//     //     res.render("index")
//     // } 
//     // else{
//     //     res.redirect("/")
//     // }
// }

// module.exports.addAdmin=async(req,res)=>{
//     await schema.create(req.body).then(()=>{
//         res.redirect("/addAdmin")
//     })
// }
module.exports.dashboard = (req,res)=>{
    res.render("dashboard")
}
module.exports.addadmin =(req,res)=>{
    res.render("addAdmin")
}
module.exports.viewadmin = async(req,res)=>{
    await schema.find({})
    .then((dat)=>{
        res.render("ViewAdmin",{dat})
    })
   
} 
module.exports.addData = async(req,res)=>{
    console.log(req.body)
    await schema.create(req.body)
    .then(()=>{
        res.redirect("/viewadmin")
    })
}
module.exports.delete =async(req,res)=>{
    console.log(req.query.id)
    await schema.findByIdAndDelete(req.query.id)
    .then(()=>{
        res.redirect("/viewadmin")
    })
}

module.exports.edit= async(req,res)=>{
    await schema.findById(req.query.id).then((dat)=>{
        res.render("update",{dat})
    })
}

module.exports.update= async(req,res)=>{
    console.log(req.body.id)
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/viewadmin")
    })
}