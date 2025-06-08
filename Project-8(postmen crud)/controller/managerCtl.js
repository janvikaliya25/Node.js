const schema = require("../modal/schema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer")

module.exports.managerLogin = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
     res.status(400).json({ msg: "Email and password are required" });
  }

  await schema.findOne({email:req.body.email})
    .then(manager => {
      if (!manager) {
        res.status(404).json({ msg: "Manager not found" });
      }

      bcrypt.compare(password, manager.password)
        .then(isMatch => {
          if (!isMatch) {
            res.status(401).json({ msg: "Incorrect password" });
          }

          const token = jwt.sign(
            { id: manager._id, role: manager.role },
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


module.exports.managerProfile = async (req, res) => {

  // console.log(req.user.id)

  await schema.findById(req.user.id)
    .then(manager => {
      if (!manager) {
        res.status(404).json({ msg: "Manager not found" });
      }
      else {
        res.status(200).json({
          msg: "Manager profile fetched",
          manager
        });
      }
    })
    .catch(err => {
      res.status(500).json({ msg: "Server error", error: err });
    });
};

module.exports.changeManagerPassword = async(req, res) => {
  const { oldpass, newpass, confirmpass } = req.body;

  await schema.findById(req.user.id)
    .then(manager => {
      if (!manager) {
         res.status(404).json({ msg: "Manager is not found...!" });
      }

      return bcrypt.compare(oldpass, manager.password)
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
              return schema.findByIdAndUpdate(manager._id, { password: hashpass });
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

module.exports.forgotManagerPassword = async (req, res) => {
  console.log(req.body)
  let manager = await schema.findOne({ email: req.body.email });

  console.log(manager)

  if(!manager){
    return res.status(400).json({msg:"email not found...!"})
  }

  let OTP = Math.floor(Math.random()*1000+4000)
  console.log(OTP)
  mailer.sendOTP(manager.email,OTP)

  let token= jwt.sign({email : manager.email , otp:OTP}, "user" ,{expiresIn: "1h"})
  console.log(token)

};


module.exports.setManagerNewPass = async (req, res) => {
  const { otp: enteredOtp, newpassword, confirmpassword } = req.body;

  if (!enteredOtp || !newpassword || !confirmpassword) {
    return res.status(400).json({ msg: "OTP, new password, and confirm password are required." });
  }

  const otp = req.body.otp;
  const managerEmail = req.body.email;

  if (!managerEmail || !otp) {
    return res.status(400).json({ msg: "User info not found in token." });
  }

  if (enteredOtp !== otp) {
    return res.status(400).json({ msg: "Invalid OTP." });
  }

  if (newpassword !== confirmpassword) {
    return res.status(400).json({ msg: "Password and confirm password do not match." });
  }

  const hashedPassword = await bcrypt.hash(confirmpassword, 10);

  schema.findOneAndUpdate({ email: managerEmail }, { password: hashedPassword })
    .then(() => {
      return res.status(202).json({ msg: "Your password updated with help of OTP." });
    })
    .catch((error) => {
      return res.status(500).json({ msg: "Error updating password in DB." });
    });
};


module.exports.addEmployee = async (req, res) => {
  const { username, email, phone, password} = req.body;

  const manager = await schema.findOne({email:req.body.email});
  if (manager) {
    return res.status(400).json({ msg: "Employee already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const employee = new schema({
    username,
    email,
    phone,
    password: hashed,
    role: "employee",
    managerId: req.user.id
  });

  await employee.save().then(async (data) => {
    res.json({ msg: "Employee added.", employee: data });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  });
};

module.exports.viewEmployees = async (req, res) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ msg: "Access denied, managers only." });
  }

  await schema.find({ managerId: req.user.id, role: "employee" })
    .then((employees) => {
      res.status(200).json({ employees });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server error", error: err.message });
    });
};