import express from 'express';
import cors from 'cors';
/* Cross-Origin Resources Sharing, es una política a nivel de navegador
web para prevenir que el dominio A acceda a recursos del dominio B */

import db from './database'; // Importamos la conexión con la base de datos
import cartController from './controllers/cart';
import getProducts from './controllers/product';

import dotenv from "dotenv"; // Lo usamos para configurar la conexión a la base de datos
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Middleware que transforma la req.body a un json

// GET
app.get("/products", getProducts);
app.get("/products-cart", cartController.getProductsCart);

// POST
app.post("/products-cart", cartController.addProductCart);

// PUT
app.put("/products-cart/:productId", cartController.putProduct);

// DELETE
app.delete("/products-cart/:productId", cartController.deleteProduct);

app.listen(process.env.PORT, () => {
  console.log(`Server funcionando en el puerto ${process.env.PORT}`);
  db();
});

export default app;
