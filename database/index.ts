import mongoose from 'mongoose'; // Librería para Node.js que nos permite escribir consultas para una base de datos de MongoDB

const MONGO_URL = "mongodb+srv://spoilyzer:Manage-DB12@svcluster.kemmorw.mongodb.net/test";

const db = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Esta todo OK. LA DATABASE FUNCIONA!"))
    .catch((error) => console.error(error));
};

export default db