import mongoose from 'mongoose';

const MONGO_URL = "mongodb+srv://spoilyzer:Manage-DB12@svcluster.kemmorw.mongodb.net/test";

const db = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Esta todo OK. LA DATABASE FUNCIONA!"))
    .catch((error) => console.error(error));
};

export default db