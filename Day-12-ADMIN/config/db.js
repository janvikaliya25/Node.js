
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/SEOadmin-panelCRUD");

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database Connected!");
});

db.on("error", (err) => {
  console.error("Connection error:", err);
});

module.exports = db;
