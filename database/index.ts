import mongoose from 'mongoose'; // Librería para Node.js que nos permite escribir consultas para una base de datos de MongoDB
import dotenv from "dotenv"; // Lo usamos para configurar la conexión a la base de datos
dotenv.config();

db()
  .then(() => console.log("Esta todo OK. La BASE DE DATOS funciona!"))
  .catch((err) => console.log(err));

async function db() {
  if (process.env.DB_CONNECTION_STRING) {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } else {
    console.log("El string de la conexión se perdió");
  }
}

export default db