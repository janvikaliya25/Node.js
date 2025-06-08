const schema = require("../modal/schema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer")

module.exports.employeeLogin = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
     res.status(400).json({ msg: "Email and password are required" });
  }

  await schema.findOne({email:req.body.email})
    .then(employee => {
      if (!employee) {
        res.status(404).json({ msg: "employee not found" });
      }

      bcrypt.compare(password, employee.password)
        .then(isMatch => {
          if (!isMatch) {
            res.status(401).json({ msg: "Incorrect password" });
          }

          const token = jwt.sign(
            { id: employee._id, role: employee.role },
            "user",
            { expiresIn: "1h" }
          );

           res.status(200).json({ msg: "Login success", token });
        })
        .catch(err => {
           res.status(500).json({ msg: "Error comparing password", error: err.message });
        });
    })
    .catch(err => {
      res.status(500).json({ msg: "Database error", error: err.message });
    });
};

module.exports.employeeProfile = async(req,res)=>{
    console.log(req.user.id)

  await schema.findById(req.user.id)
    .then(employee => {
      if (!employee) {
        res.status(404).json({ msg: "employee not found" });
      }
      else {
        res.status(200).json({
          msg: "employee profile fetched",
          employee
        });
      }
    })
    .catch(err => {
      res.status(500).json({ msg: "Server error", error: err });
    });
}

module.exports.changeEmployeePassword = async(req, res) => {
  const { oldpass, newpass, confirmpass } = req.body;

  await schema.findById(req.user.id)
    .then(employee => {
      if (!employee) {
         res.status(404).json({ msg: "employee is not found...!" });
      }

      return bcrypt.compare(oldpass, employee.password)
        .then(isMatch => {
          if (!isMatch) {
            res.status(401).json({ msg: "Old password is incorrect...!" });
          }

          if (newpass === oldpass) {
            res.status(400).json({ msg: "New password must be different from old password...!" });
          }

          if (newpass !== confirmpass) {
            res.status(400).json({ msg: "New and confirm passwords do not match...!" });
          }

          return bcrypt.hash(newpass, 10)
            .then(hashpass => {
              return schema.findByIdAndUpdate(employee._id, { password: hashpass });
            })
            .then(() => {
              res.status(200).json({ msg: "Password is updated...!" });
            });
        });
    })
    .catch(error => {
      res.status(500).json({ msg: "Server error", error: error.message });
    });
};

module.exports.forgotEmployeePassword = async (req, res) => {
  console.log(req.body)
  let admin = await schema.findOne({ email: req.body.email });

  console.log(admin)

  if(!admin){
    return res.status(400).json({msg:"email not found...!"})
  }

  let OTP = Math.floor(Math.random()*1000+4000)
  console.log(OTP)
  mailer.sendOTP(admin.email,OTP)

  let token= jwt.sign({email : admin.email , otp:OTP}, "user" ,{expiresIn: "1h"})
  console.log(token)

};


module.exports.setEmployeeNewPass = async (req, res) => {
  const { otp: enteredOtp, newpassword, confirmpassword } = req.body;

  if (!enteredOtp || !newpassword || !confirmpassword) {
    return res.status(400).json({ msg: "OTP, new password, and confirm password are required." });
  }

  const otp = req.body.otp;
  const employeeEmail = req.body.email;

  if (!employeeEmail || !otp) {
    return res.status(400).json({ msg: "User info not found in token." });
  }

  if (enteredOtp !== otp) {
    return res.status(400).json({ msg: "Invalid OTP." });
  }

  if (newpassword !== confirmpassword) {
    return res.status(400).json({ msg: "Password and confirm password do not match." });
  }

  const hashedPassword = await bcrypt.hash(confirmpassword, 10);

  schema.findOneAndUpdate({ email: employeeEmail }, { password: hashedPassword })
    .then(() => {
      return res.status(202).json({ msg: "Your password updated with help of OTP." });
    })
    .catch((error) => {
      return res.status(500).json({ msg: "Error updating password in DB." });
    });
};