import { Cart } from "../model/Cart";
import { Request, Response } from "express";

const getProductsCart = async (req: Request, res: Response) => {
  const productsCart = await Cart.find();

  if (productsCart) {
    res.json({ productsCart });
  } else {
    res.json({ mensaje: "No hay productos en el carrito" });
  }
};

export default getProductsCart;
