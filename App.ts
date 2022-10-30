import express from 'express'; // Es el framework web mas popular de Node
import cors from 'cors';
/* Cross-Origin Resources Sharing, es una política a nivel de navegador
web para prevenir que el dominio A acceda a recursos del dominio B */

import db from './database'; // Importamos la conexión con la base de datos
import controllers from './controllers';

const app = express();

app.use(cors());
app.use(express.json()); // Middleware que transforma la req.body a un json

// GET
app.get("/products", controllers.getProducts);
app.get("/products-cart", controllers.getProductsCart);

// POST
app.post("/products-cart", controllers.addProductCart);

// PUT
app.put("/products-cart/:productId", controllers.putProduct);

// DELETE
app.delete("/products-cart/:productId", controllers.deleteProduct);

app.listen(4000, () => {
  console.log("Server funcionando en el puerto 4000");
  db();
});

export default app;
