const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://spoilyzer:Manage-DB12@svcluster.kemmorw.mongodb.net/test";

const db = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB FUNCIONANDO"))
    .catch((error) => console.error(error));
};

module.exports = db