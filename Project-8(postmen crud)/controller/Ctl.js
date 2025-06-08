
const schema = require("../modal/schema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer")

module.exports.registerAdmin = async (req, res) => {
  let admin = await schema.findOne({ email: req.body.email });

  if (admin) {
    return res.status(200).json({ msg: "User already existed" });
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  await schema.create(req.body).then((data) => {
    res.json({ msg: "Admin added...!", user: data });
  });
};

module.exports.adminLogin = async (req, res) => {
  let admin = await schema.findOne({ email: req.body.email });

  if (!admin) {
    return res.status(100).json({ msg: "Admin Not Found !", code: 100 });
  }

  if (await bcrypt.compare(req.body.password, admin.password)) {
    const token = jwt.sign({ id: admin._id, role: admin.role }, "user", { expiresIn: "1h" });
    return res.status(200).json({ msg: "Admin Logged In Successfully !", code: 200, token: token });
  } else {
    return res.status(200).json({ msg: "Admin password is wrong !", code: 102 });
  }
};

module.exports.adminProfile = async (req, res) => {
  console.log(req.user)
  let profile = await schema.findOne({ email: req.user.email })
  if (!profile) {
    res.status(404).json({ msg: "your data / token is not found" })
  }

  return res.status(202).json({ msg: "your data is getting", data: profile })
};

module.exports.changePassword = async (req, res) => {
  let { oldpass, newpass, confirmpass } = req.body;

  let admin = await schema.findById(req.user._id);
  console.log(admin);

  if (!admin) {
    return res.json({ msg: "Admin is not found...!" });
  }

  const pass = await bcrypt.compare(oldpass, admin.password);

  if (pass) {
    if (newpass !== oldpass) {
      if (newpass === confirmpass) {
        const hashpass = await bcrypt.hash(newpass, 10);

        schema.findByIdAndUpdate(admin._id, { password: hashpass }).then(() => {
          res.json({ msg: "Password is updated...!" });
        });
      } else {
        res.json({ msg: "New and confirm passwords do not match...!" });
      }
    } else {
      res.json({ msg: "New password must be different from old password...!" });
    }
  } else {
    res.json({ msg: "Old password is incorrect...!" });
  }
}

module.exports.forgotPassword = async (req, res) => {
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


module.exports.setNewPass = async (req, res) => {
  const { otp: enteredOtp, newpassword, confirmpassword } = req.body;

  if (!enteredOtp || !newpassword || !confirmpassword) {
    return res.status(400).json({ msg: "OTP, new password, and confirm password are required." });
  }

  const otp = req.body.otp;
  const adminEmail = req.body.email;

  if (!adminEmail || !otp) {
    return res.status(400).json({ msg: "User info not found in token." });
  }

  if (enteredOtp !== otp) {
    return res.status(400).json({ msg: "Invalid OTP." });
  }

  if (newpassword !== confirmpassword) {
    return res.status(400).json({ msg: "Password and confirm password do not match." });
  }

  const hashedPassword = await bcrypt.hash(confirmpassword, 10);

  schema.findOneAndUpdate({ email: adminEmail }, { password: hashedPassword })
    .then(() => {
      return res.status(202).json({ msg: "Your password updated with help of OTP." });
    })
    .catch((error) => {
      return res.status(500).json({ msg: "Error updating password in DB." });
    });
};


module.exports.addManager = async (req, res) => {
  const { username, email, phone, password } = req.body;

  const admin = await schema.findOne({ email: req.body.email });
  if (admin) {
    return res.status(400).json({ msg: "Manager already exists with this email" });
  }

  const hash = await bcrypt.hash(password, 10);

  const manager = new schema({
    username,
    email,
    phone,
    password: hash,
    role: "manager",
    adminId: req.user.id
  });

  await manager.save().then(async (data) => {
    res.json({ msg: "Manager added successfully", manager: data });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  });
};

module.exports.getAllManagers = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied, admin only." });
  }

  await schema.find({ role: "manager" })
    .then((managers) => {
      res.status(200).json({ msg: "All manager data is fetched", count: managers.length, managers });
    })
    .catch((err) => {
      res.status(500).json({ msg: "No manager data fetched", error: err.message });
    });
};

module.exports.deleteManager = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied, admin only." });
  }

  const { id } = req.params;

  await schema.findById(id)
    .then(manager => {
      if (!manager || manager.role !== "manager") {
        return res.status(404).json({ msg: "Manager not found" });
      }

      manager.active = !manager.active;
      return manager.save()
        .then(() => {
          res.status(200).json({
            msg: `Manager has been ${manager.active ? "activated" : "deactivated"}.`,
            status: manager.active
          });
        });
    })
    .catch(err => {
      res.status(500).json({ msg: "Server error", error: err.message });
    });

}

module.exports.viewAllEmployee = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied, admin only." });
  }

  await schema.find({ role: "employee" })
    .then((employees) => {
      res.status(200).json({ employees });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server error", error: err.message });
    });
};

module.exports.deleteEmployee = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied, admin only." });
  }

  const { id } = req.params;

  await schema.findById(id)
    .then(employee => {
      if (!employee || employee.role !== "employee") {
        return res.status(404).json({ msg: "employee not found" });
      }

      employee.active = !employee.active;
      return employee.save()
        .then(() => {
          res.status(200).json({
            msg: `Employee has been ${employee.active ? "activated" : "deactivated"}.`,
            status: employee.active
          });
        });
    })
    .catch(err => {
      res.status(500).json({ msg: "Server error", error: err.message });
    });

}